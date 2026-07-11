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

export interface LoginResponse {
    access_token: string,
    token_type: string
}

export interface RegisterResponse {
    New_User:string
}

export async function Login(data: AuthRequest) {
    const api = await axios.post<LoginResponse>("http://localhost:80/url/login", data)
    const response = api.data.access_token
    localStorage.setItem("token", response)
    console.log("toen: ", localStorage.getItem("token"));

    return response

}
export async function Register(data: AuthRequest) {
    const api = await axios.post<RegisterResponse>("http://localhost:80/url/register", data)
    const response = api.data.New_User
    return response

}


export async function ShortnerUrl(url: string) {
    const api = await axios.post<ShortnerURLResponse>("http://localhost:80/url/shorten",
        { original_url: url }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return api.data.data.short_url
}
