export default function NewUrl({shorturl}: {shorturl: string}) {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/url/${shorturl}`;
    
    return (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <div>
                    <p className="text-sm text-green-400/80 font-medium uppercase tracking-wider">Compression Successful</p>
                    <p className="text-lg text-white font-semibold tracking-wide mt-0.5">{fullUrl}</p>
                </div>
            </div>
            
            <a 
                href={fullUrl} 
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-black font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.4)] whitespace-nowrap"
            >
                Test Link &rarr;
            </a>
        </div>
    )
}