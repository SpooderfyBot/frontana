import { writable } from "svelte/store";
import {onMount} from "svelte";
import axios from "axios";

export const token = writable();
export const user = writable();
export const error = writable();

export const baseURL = "http://127.0.0.1:8000/api/v0";
export const loginURL = "https://discord.com/api/oauth2/authorize?client_id=585225058683977750&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fauth%2Fauthorized&response_type=code&scope=identify%20guilds"

token.subscribe(value => {
    if (value === undefined || value === "undefined") {
        return
    }

    if (value == null) {
        user.set(null);
        localStorage.removeItem("session");
        return
    }

    localStorage.setItem("session", value);
})

export const logout = async () => {
    let t;
    token.update(value => {
        t = value;
        return null
    });

    await axios.post(
        "/auth/revoke",
        {},
        { baseURL, params: { "token": t } },
    );
}

export const fetchUser = async (t) => {
    if (!t) {
        return null;
    }

    try {
        const { data } = await axios.get(
            "/users/@me",
            { baseURL, headers: { "Authorization": `Bearer ${t}` } },
        );
        return data;
    } catch {
        token.set(null);
    }
}

export const exchangeCode = async (code) => {
    const { data } = await axios.get(
        "/auth/authorize",
        { baseURL, params: {code} },
    );

    return data.access_token;
}