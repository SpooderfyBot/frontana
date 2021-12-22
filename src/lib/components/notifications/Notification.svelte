<script>
    import moment from "moment";
    import {fly} from 'svelte/transition';

    import DynamicIcon from "$lib/components/icons/DynamicIcon.svelte";
    import {authClient} from "$lib/http/auth.js";
    import {notifications, removeNotification} from "$lib/components/notifications/notifs.js";

    export let notification;

    let description = notification.description ?? "This notification has no description.";
    let canExpand = description.length > 56;
    let expand = false;

    let add = "";
    if (canExpand) {
        add = "...";
    }

    description = description.substr(0, 56) + add;

    const expandNotification = () => {
        expand = !expand && canExpand;

        if (!expand) {
            let add = "";
            if (canExpand) {
                add = "...";
            }

            description = description.substr(0, 56) + add;
        } else {
            description = notification.description ?? "This notification has no description.";
        }
    }

    const close = async () => {
        notifications.update(value => value.filter(v => v._id !== notification._id));
        await removeNotification(notification._id, $authClient);
    }
</script>


<div
    id={notification._id}
    class="flex justify-between items-center {canExpand ? 'cursor-pointer' : 'cursor-default'} border-b border-gray-700 pb-2 w-full"
    on:click={expandNotification}
    in:fly={{ delay: 100, duration: 300, x: 100, }}
>
    <div class="flex">
        <div class="self-start pt-1">
            <DynamicIcon icon={notification.icon}/>
        </div>
        <div class="self-start ml-2">
            <p class="text-sm font-bold text-gray-100">
                {notification.title}
                <span class="font-normal">
                    -
                </span>
                <span class="text-gray-400 font-normal">
                    Sent {moment(new Date(notification.created_on)).fromNow()}
                </span>
            </p>
            <p class="text-sm text-gray-300">
                {description}
            </p>
        </div>
    </div>
    <button class="self-start text-red-500 mr-2 mt-2" on:click={close}>
        <svg xmlns="http://www.w3.org/2000/svg" class=" h-6 w-6" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    </button>
</div>
