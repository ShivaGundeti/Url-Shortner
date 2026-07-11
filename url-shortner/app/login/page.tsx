"use client"

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Login, AuthRequest } from "../../api/index"
export default function Loginpage() {
    const { register, handleSubmit, } = useForm<AuthRequest>()
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
                <input type="text" {...register("email", { required: "Email is required" })} placeholder="Enter email" />
                <input type="password" {...register("password")} placeholder="Enter password" />
                {/* <p>{errors?.email?.message}</p> */}
                <button>Submit</button>
            </form>
        </>
    )
}