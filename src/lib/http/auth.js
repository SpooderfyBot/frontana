import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/api/v0";
export const loginURL = "https://discord.com/api/oauth2/authorize?client_id=585225058683977750&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fauth%2Fauthorized&response_type=code&scope=identify%20guilds"

const getToken = () => {
    return localStorage.getItem("session");
}

export const setToken = (token) => {
    localStorage.setItem("session", token);
}

export const authorizeCode = async (code) => {
    console.log(code);
    const { data } = await axios.get(
        `/auth/authorize?code=${code}`,
        {
            baseURL: baseURL,
        });

    return data.access_token;
}

export const logout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("session");
}

export const fetchUser = async () => {
    const token = getToken();

    if (!token) {
        return null;
    }

    const maybeUser = sessionStorage.getItem("user");
    if (maybeUser) {
        return JSON.parse(maybeUser);
    }

    const { data } = await axios.get(
        "/users/@me",
        {
            baseURL: baseURL,
            headers: { "Authorization": `Bearer ${token}` }
        });

    sessionStorage.setItem("user", JSON.stringify(data));

    return data
}


