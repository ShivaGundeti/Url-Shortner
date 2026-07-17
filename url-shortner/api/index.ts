import axios from "axios";

export interface ShortnerURLRequest {
    original_url: string;
}

export interface ShortnerURLResponse {
    data: {
        short_url: string;
    }
}

export type AuthRequest = {
    email: string
    password: string
}



export interface RegisterResponse {
    New_User:string
}

export async function Login(data: AuthRequest) {
    const api = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/url/login`, data,{withCredentials:true})
    const response = api.data
    console.log(response,"--------->>>");
    
    return response

}
export async function Register(data: AuthRequest) {
    const api = await axios.post<RegisterResponse>(`${process.env.NEXT_PUBLIC_API_URL}/url/register`, data,{withCredentials:true})
    const response = api.data.New_User
    return response

}


export async function ShortnerUrl(url: string) {
    const api = await axios.post<ShortnerURLResponse>(`${process.env.NEXT_PUBLIC_API_URL}/url/shorten`,
        { original_url: url },{withCredentials:true})
    return api.data.data.short_url
}
