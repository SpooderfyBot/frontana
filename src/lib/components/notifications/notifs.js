import {writable} from "svelte/store";
import {
    getNotifications as getN,
    removeNotification as removeN,
} from "$lib/http/notifications.js";

export const notifications = writable(null);
export const error = writable();


export const getNotifications = async (token) => {
    const n = await getN(token);
    console.log(n);
    notifications.set(n);
}

export const removeNotification = async (id, token) => {
    await removeN(id, token);
    await getNotifications(token);
}
