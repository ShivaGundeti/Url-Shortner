from fastapi import FastAPI
from prisma import Prisma
from pydantic import BaseModel
import string
import random
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # This tells Python that Next.js is allowed!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = Prisma()

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
async def UrlShortner(request: URLRequest):
    originalUrl = request.original_url
    randomStr = "".join(random.choices(string.ascii_letters,k=5))
    ShortUrl = await db.url.create(
        data={"original_url": originalUrl, "short_url": randomStr}
    )
    return{"status": "Success","data": ShortUrl}


@app.get("/url/{code}")
async def redirect_url(code:str):
    findurl = await db.url.find_first(
        where={
            "short_url": code
        }
    )

    return RedirectResponse(url=findurl.original_url)
