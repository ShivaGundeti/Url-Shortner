from ipaddress import ip_address
from fastapi import HTTPException, FastAPI, Request
from fastapi import FastAPI
from prisma import Prisma
from pydantic import BaseModel
import string
import random
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import redis
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # This tells Python that Next.js is allowed!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = Prisma()
cache = redis.Redis(host="url-redis", port=6379, db=0, decode_responses=True)
class URLRequest(BaseModel):
    original_url: str


@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@app.get("/")
async def root():
    return {"Message":"Welcome to the Url shortner API!!"}

@app.post("/url/shorten")
async def UrlShortner(url: URLRequest,request: Request):
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
        data={"original_url": originalUrl, "short_url": randomStr}
    )
    return{"status": "Success","data": ShortUrl}


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

    
