"use client"

import { useEffect, useState } from "react"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ShortnerUrl} from "../../api/index";
import NewUrl from "./NewUrl"
import {GetUserUrls} from "../../api/user"
import ParticleBackground from "./ParticleBackground"

export default function UserSearch() {
    const queryClient = useQueryClient();
    const[Url,setUrl] = useState("")
    const [ShortUrl,setShortUrl] = useState("")
    
    const {mutate, isPending} = useMutation({
        mutationFn: ShortnerUrl,
        onSuccess: (data) => {
            setShortUrl(data)
            queryClient.invalidateQueries({ queryKey: ["Users"] })
        },
        onError: (error) => {
            console.error("Something went wrong!",error)
        }
    })
    
    const {data,isLoading,error} = useQuery({
        queryKey:["Users"],
        queryFn: GetUserUrls
    })

    return (
        <main className="relative min-h-screen bg-[#050505] flex flex-col items-center font-sans overflow-hidden px-4 py-20 lg:py-32">
            
            {/* Interactive Particle Canvas */}
            <ParticleBackground />

            {/* Antigravity-style Glow Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-5xl space-y-12">
                
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 tracking-tight drop-shadow-sm">
                        URL Shortner
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Compress your URLs into frictionless, warp-speed short links.
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white/[0.03] backdrop-blur-2xl p-2 rounded-[2rem] shadow-2xl border border-white/[0.08] relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="flex flex-col sm:flex-row gap-2 relative">
                        <input 
                            type="text" 
                            placeholder="Enter a long URL to compress..." 
                            onChange={(e)=>setUrl(e.target.value)} 
                            className="flex-1 px-8 py-5 text-lg bg-transparent text-white placeholder-gray-500 border-none rounded-3xl focus:outline-none focus:ring-0 transition-all" 
                        />
                        <button 
                            className="px-10 py-5 font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-[1.5rem] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(99,102,241,0.4)]" 
                            onClick={()=> mutate(Url)}
                            disabled={isPending || !Url}
                        >
                            {isPending ? "Compressing..." : "Shorten"}
                        </button>
                    </div>
                    
                    {/* Result Alert */}
                    {ShortUrl && !isPending && (
                        <div className="mt-4 mx-4 mb-4 p-5 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-between backdrop-blur-md">
                            <NewUrl shorturl={ShortUrl}/>
                        </div>
                    )}
                </div>

                {/* History Section */}
                <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/[0.08] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                    
                    <div className="px-8 py-6 border-b border-white/[0.08]">
                        <h3 className="text-xl font-semibold text-white/90">Link History</h3>
                    </div>
                    
                    <div className="p-8">
                        {isLoading && (
                            <div className="flex justify-center items-center py-12">
                                <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-purple-500 animate-spin"></div>
                            </div>
                        )}
                        
                        {error && (
                            <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-center backdrop-blur-md">
                                <span className="block text-lg font-semibold mb-1">Authorization Expired</span>
                                <span className="text-sm opacity-80">Your JWT token likely expired while you were at dinner! Please log in via Swagger again and update your token in api/user.ts</span>
                            </div>
                        )}

                        {!isLoading && !error && data?.length === 0 && (
                            <div className="text-center py-12 text-gray-500 font-medium">
                                No history found drifting in the void.
                            </div>
                        )}

                        {data && data.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-xs tracking-widest text-gray-500 uppercase border-b border-white/10">
                                            <th className="pb-4 font-semibold pl-2">Original Target</th>
                                            <th className="pb-4 font-semibold pl-4">Compressed Link</th>
                                            <th className="pb-4 font-semibold text-right pr-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.05]">
                                        {data.map((item) => (
                                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="py-5 pl-2 pr-4">
                                                    <div className="max-w-[200px] sm:max-w-[250px] md:max-w-md truncate text-gray-300 font-medium group-hover:text-white transition-colors" title={item.original_url}>
                                                        {item.original_url}
                                                    </div>
                                                </td>
                                                <td className="py-5 px-4 text-purple-400 font-medium">
                                                    http://localhost/url/{item.short_url}
                                                </td>
                                                <td className="py-5 text-right pr-2">
                                                    <a 
                                                        href={`http://localhost/url/${item.short_url}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-105 active:scale-95"
                                                    >
                                                        Launch &rarr;
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    )
}