"use client"

import { useEffect, useState } from "react"
import axios from 'axios'
import NewUrl from "./NewUrl"
export default function UserSearch() {
    const[Url,setUrl] = useState("")
    const[newUrl, setnewUrl] = useState("")
    async function ShortUrl(){
        const url = await axios.post("http://localhost:80/url/shorten",{ original_url: Url })
        console.log(url);
        setnewUrl(url.data.data.short_url)
    }
    useEffect(()=>{
        console.log(newUrl);
        
    },[newUrl])
    return (
        <main>
            <div>
                <div className="border border-2 border-black">
                    <input type="text" placeholder="Enter or paste your Url" onChange={(e)=>setUrl(e.target.value)} className="w-160 p-5 h-16 text-3xl" />
                    <button className="p-5 bg-green-400 text-2xl" onClick={ShortUrl}>Short</button>
                </div>
                {newUrl ? <NewUrl shorturl={newUrl}/>: ""}
            </div>
        </main>
    )
}