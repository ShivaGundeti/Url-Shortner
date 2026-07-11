import axios from "axios";

export interface UserUrlsResponse {
    data: {
        id: string,
        original_url: string,
        short_url: string
    }[]
}


export async function GetUserUrls(){
    const api = await axios.get<UserUrlsResponse>("http://localhost:80/url/user",{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }})
    return api.data.data
}