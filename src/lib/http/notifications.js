import axios from "axios";

import {baseURL} from "$lib/http/auth.js";


export const getNotifications = async (token) => {
    const { data } = await axios.get(
        "/users/@me/notifications",
        { baseURL, headers: { "Authorization": `Bearer ${token}` } },
    );

    return data
}

export const removeNotification = async (id, token) => {
    await axios.delete(
        "/users/@me/notifications",
        { baseURL, headers: { "Authorization": `Bearer ${token}` }, params: { id } },
    );
}