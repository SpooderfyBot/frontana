import axios from "axios";
import {setupCache} from "axios-cache-adapter";

import {derived, writable} from "svelte/store";
import {writable as persistentStore} from "svelte-local-storage-store";

export const baseURL = "http://127.0.0.1:8000/api/v0";
export const loginURL = "https://discord.com/api/oauth2/authorize?client_id=585225058683977750&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fauth%2Fauthorized&response_type=code&scope=identify%20guilds"

const cache = setupCache({
   maxAge: 2500,
   exclude: {
       methods: ["delete"]
   }
});

export const basicClient = axios.create({
    baseURL,
    adapter: cache.adapter,
})

export const token = persistentStore("session", null);
export const authClient = writable();

token.subscribe(token => {
    const client = axios.create({
        baseURL,
        adapter: cache.adapter,
        headers: { Authorization: `Bearer ${token}` }
    })

    authClient.set(client);
})

export const logout = async () => {
    let t;
    token.update(value => {
        t = value;
        return null;
    })

    await basicClient.post("/auth/revoke", {}, {
        params: { "token": t }
    })
}

export const user = derived([token], ([$token], set) => {
    if ($token == null) {
        set(null);
        return;
    }

    basicClient.get(
        "/users/@me",
        {
            headers: {
                "Authorization": `Bearer ${$token}`
            }
        }
    ).then((r) => {
        set(r.data);
    }).catch(() => {
        // We'll get re-triggered
        token.set(null);
    })
})