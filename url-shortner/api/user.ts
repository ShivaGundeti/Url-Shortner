import axios from "axios";

export interface UserUrlsResponse {
    data: {
        id: string,
        original_url: string,
        short_url: string
    }[]
}


export async function GetUserUrls(){
    const api = await axios.get<UserUrlsResponse>(`${process.env.NEXT_PUBLIC_API_URL}/url/user`,{withCredentials:true})
    return api.data.data
}