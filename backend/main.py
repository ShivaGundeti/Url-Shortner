from fastapi import HTTPException, FastAPI, Request, Response
from fastapi import FastAPI
from prisma import Prisma
from pydantic import BaseModel
import string
import random
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import redis
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
from fastapi import Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import socket
app = FastAPI()
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:3001"], # This tells Python that Next.js is allowed!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SECRET_KEY = "exwehyuioppanjzz"
db = Prisma()
cache = redis.Redis(host="url-redis", port=6379, db=0, decode_responses=True)
class URLRequest(BaseModel):
    original_url: str

class PassRequest(BaseModel):
    password: str

class AuthRequest(BaseModel):
    email: str
    password: str

class UserUrls(BaseModel):
    id: str

@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@app.get("/")
async def root():
    hostname = socket.gethostname()
    return {"Message": f"Welcome to the Url shortner API!! Served by Server ID: {hostname}"}


@app.post("/url/test-api")
async def TestPass(url: PassRequest):
    password = url.password
    hashed = pwd_context.hash(password)
    return {"Sucess": hashed}

@app.post("/url/register")
async def SignUp(request: AuthRequest):
    user_email = request.email
    user_password = request.password
    if not user_email.strip() or not user_password.strip():
        raise HTTPException(status_code=400,detail="Email and Password are required")
    else:
        hashed_password = pwd_context.hash(user_password)
        New_User = await db.user.create(
            data = {
             "email":user_email,"password":hashed_password
            }
        )
        return {"Status:":201,"data":New_User}


@app.post("/url/login")
async def SignIn(request: AuthRequest,response:Response):
    user_email = request.email
    user_password = request.password
    if not user_email.strip() or not user_password.strip():
        raise HTTPException(status_code=400,detail="Email and password are required")
    else:
        
        User = await db.user.find_first(
            where={
                "email":user_email
            }
        )
        if not User:
            raise HTTPException(status_code=404,detail="Incorrect email or password")
        is_valid = pwd_context.verify(user_password, User.password)
    
        if not is_valid:
            raise HTTPException(status_code=401, detail="Incorrect email or password")
        expire = datetime.utcnow() + timedelta(minutes=60)
        payload = {"sub":User.id,"exp":expire}
        token = jwt.encode(payload,SECRET_KEY,algorithm="HS256")
        response.set_cookie(
            key="access_token",
            value=f"Bearer {token}",
            httponly=True,
            samesite="lax",
            max_age=3600
        )
        return {"message": "Successfully logged in"}

def verify_token(request:Request):
     token_cookie = request.cookies.get("access_token")
     if not token_cookie:
        raise HTTPException(status_code=401, detail="Not authenticated")
     else:
        token = token_cookie.split(" ")[1]
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            return payload.get("sub") # Returns the User ID!
        except:
            raise HTTPException(status_code=401, detail="Invalid or expired token")


@app.post("/url/shorten")
async def UrlShortner(url: URLRequest, request: Request, user_id: str = Security(verify_token)):
    ip_address = request.client.host
    redis_key = f"rate_limit:post:{ip_address}"
    print("ip_address: ",ip_address)
    requests_count = cache.incr(redis_key)
    print("requests_count",requests_count)
    if requests_count == 1:
        cache.expire(redis_key,60)
    if requests_count > 5:
        raise HTTPException(status_code=429,detail="Too Many Requests")
    originalUrl = url.original_url
    randomStr = "".join(random.choices(string.ascii_letters,k=5))
    ShortUrl = await db.url.create(
        data={"original_url": originalUrl, "short_url": randomStr,"userId":user_id}
    )
    return{"status": "Success","data": ShortUrl}


   
@app.get("/url/user")
async def GetUserUrls(userid: str = Security(verify_token)):
    userData = await db.url.find_many(
        where={
            "userId":userid
        }
    )
    return {"data":userData}













@app.get("/url/{code}")
async def redirect_url(code:str,request:Request):
    ip_address = request.client.host
    redis_key = f"rate_limit:get:{ip_address}"
    requests_count = cache.incr(redis_key)
    print("requests_count",requests_count)
    if requests_count == 1:
        cache.expire(redis_key,60)
    if requests_count > 5:
        raise HTTPException(status_code=429,detail="Too Many Requests")
    cached_url = cache.get(code)
    if cached_url:
        return RedirectResponse(url=cached_url)
    else:
        findurl = await db.url.find_first(
            where={
                "short_url" : code
            }
        )
        if findurl:
            cache.set(code,findurl.original_url,ex=3600)
            return RedirectResponse(url=findurl.original_url)
        else:
            raise HTTPException(status_code=404, detail="Short URL does not exist")

 