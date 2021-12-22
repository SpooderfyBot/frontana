import {writable} from "svelte/store";

export const notifications = writable(null);
export const error = writable();


export const getNotifications = async (client) => {
    const { data } = await client.get("/users/@me/notifications");
    notifications.set(data);
}

export const removeNotification = async (id, client) => {
    await client.delete(
        "/users/@me/notifications",
        { params: { id } }
    );
    await getNotifications(client);
}
