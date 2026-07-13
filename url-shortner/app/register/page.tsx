"use client"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Register, AuthRequest } from "../../api/index"
import LoginSchema from "@/schemas/loginschema";
import Link from "next/link";

export default function Registerpage() {
    const [showPassword, setShowPassword] = useState(false);
    
    // Wire up Zod validation here too!
    const { register, handleSubmit, formState: { errors } } = useForm<AuthRequest>({
        resolver: zodResolver(LoginSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: Register,
        onSuccess: (data) => {
            console.log("Registered successfully:", data);
        },
        onError: (error) => {
            console.error("Something went wrong!", error)
        }
    })

    const onSubmit = (data: AuthRequest) => {
        mutate(data)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Create Account</h2>
                    <p className="text-gray-400 mt-2 text-sm">Join to start shrinking your links</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                        <input 
                            type="text" 
                            {...register("email")} 
                            placeholder="you@gmail.com" 
                            className="w-full bg-black/20 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                {...register("password")} 
                                placeholder="••••••••" 
                                className="w-full bg-black/20 border border-white/10 text-white placeholder-gray-500 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button 
                        disabled={isPending}
                        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold rounded-xl px-4 py-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
                    >
                        {isPending ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-8">
                    Already have an account? <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Sign in here</Link>
                </p>
            </div>
        </div>
    )
}