import axios from "axios";

export interface UserUrlsResponse {
    data: {
        id: string,
        original_url: string,
        short_url: string
    }[]
}


export async function GetUserUrls(){
    const api = await axios.get<UserUrlsResponse>("http://16.171.3.40:80/url/user",{withCredentials:true})
    return api.data.data
}