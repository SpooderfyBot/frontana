<script>
    import {fade} from 'svelte/transition';
    import {onMount} from "svelte";
    import {BarLoader} from "svelte-loading-spinners";

    import {token} from "$lib/http/auth.js";

    import Notification from "./Notification.svelte";
    import {notifications, error, getNotifications} from "./notifs.js";

    onMount(async () => {
        await getNotifications($token);
    })

    let userNotifications = null;
    notifications.subscribe(value => {
        if (value === null || value === undefined) {
            return;
        }

        userNotifications = value;
    })
</script>

<h3 class="pb-2 font-semibold">Notifications</h3>
<div class="flex flex-col w-full border-l border-indigo-600 py-4 mx-4">
    {#if userNotifications == null}
        <div class="self-center mr-4" in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
            <BarLoader size="32" color="#0EA5E9" unit="px" duration="1s"/>
        </div>
    {:else}
        {#if $error === undefined}
            {#if userNotifications.length === 0}
                <p class="text-base font-semibold px-4">
                    <img class="inline-block w-5 h-5 mr-2" src="/icons/zzz.png" alt="">
                    No notifications waiting for you.
                </p>
            {:else}
                <div class="space-y-4 px-4">
                    {#each userNotifications.slice(0, 10) as notification}
                        <Notification {notification}/>
                    {/each}
                </div>
            {/if}
        {:else}
            <p class="text-xs font-semibold">Oops! Something's gone wrong when loading this.</p>
        {/if}
    {/if}
</div>