"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Login, AuthRequest } from "../../api/index"
import LoginSchema from "@/schemas/loginschema";
export default function Loginpage() {
    const { register, handleSubmit,formState: {errors} } = useForm<AuthRequest>({
        resolver: zodResolver(LoginSchema)
    })
    //explain formState:{errors}

    const { mutate, isPending } = useMutation({
        mutationFn: Login,
        onSuccess: (data) => {
            console.log(data);

        },
        onError: (error) => {
            console.error("Something went wrong!", error)
        }
    })
    const onSubmit = (data: AuthRequest) => {
        mutate(data)
    }
    return (
        <>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("email")} placeholder="Enter email" />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
                <input type="password" {...register("password")} placeholder="Enter password" />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
               <button>Submit</button>
            </form>
        </>
    )
}