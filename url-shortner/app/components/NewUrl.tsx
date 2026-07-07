import axios from "axios"

export default function NewUrl({shorturl}) {
    
    return (
        <>
        <div>
            <div className="text-2xl text-center mt-5 flex flex-col justify-center items-center">
                <h1>New URL: http://my-domain-name/{shorturl}</h1>
            <a href={`http://localhost:80/url/${shorturl}`} target="_blank">
                <button className="text-2xl bg-green-300 p-2 border border-2 w-40 "
            >Go to Link</button>
            </a>
            </div>
        </div>
        </>
    )
}