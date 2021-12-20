import axios from "axios";

import {baseURL} from "$lib/http/auth.js";


export const getGuilds = async (token) => {
    const { data } = await axios.get(
        "/users/@me/guilds",
        { baseURL, headers: { "Authorization": `Bearer ${token}` } },
    );

    return data
}
