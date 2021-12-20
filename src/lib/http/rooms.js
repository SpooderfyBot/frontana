import axios from "axios";
import {baseURL} from "$lib/http/auth.js";

export const getCurrentRoom = async (token) => {
    const { data } = await axios.get(
        "/users/@me/rooms/current",
        {
            baseURL,
            headers: {"Authorization": `Bearer ${token}`}
        }
    )

    return data
}
