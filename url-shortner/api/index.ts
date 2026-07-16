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
    const api = await axios.post("http://16.171.3.40:80/url/login", data,{withCredentials:true})
    const response = api.data
    console.log(response,"--------->>>");
    
    return response

}
export async function Register(data: AuthRequest) {
    const api = await axios.post<RegisterResponse>("http://16.171.3.40:80/url/register", data,{withCredentials:true})
    const response = api.data.New_User
    return response

}


export async function ShortnerUrl(url: string) {
    const api = await axios.post<ShortnerURLResponse>("http://16.171.3.40:80/url/shorten",
        { original_url: url },{withCredentials:true})
    return api.data.data.short_url
}
