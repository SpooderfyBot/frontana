<script>
    import moment from "moment";
    import { SyncLoader } from 'svelte-loading-spinners'

    import {onMount} from "svelte";
    import { page } from '$app/stores'
    import {fade, fly} from 'svelte/transition';

    import Notifications from "$lib/components/notifications/Notifications.svelte";
    import {logout, loginURL, user, token, basicClient} from "$lib/http/auth.js";

    onMount(async () => {
        if ($token != null) {
            if ($page.path === "/auth/authorized") {
                window.location.replace("/");
                return
            }

            return;
        }

        if ($page.path !== "/auth/authorized") {
            return
        }

        let code = $page.query.get("code");

        if (code == null) {
            window.location.replace("/");
            return;
        }

        const {data} = await basicClient.get(
            "/auth/authorize",
            {
                params: {code}
            }
        );

        console.log(data);
        token.set(data.access_token);

        window.location.replace("/");
    })

    let showInfo = false;
    let activeUser = undefined;

    user.subscribe(value => {
        activeUser = value;
    })

    const onLogout = async () => {
        activeUser = undefined;

        await logout();

        window.location.href = "/";
    }
</script>


<div class="relative flex items-center justify-center h-10 w-48">
    {#if activeUser === undefined}
        <div in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
            <SyncLoader size="24" color="#0EA5E9" unit="px" duration="1s"/>
        </div>
    {:else if activeUser === null}
        <a class="absolute" href={loginURL} in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
            <img class="inline-block w-5 h-5 mr-1" src="/icons/discord/logo-white.svg" alt=""/>
            <span class="decoration-sky-500 decoration-2 underline-offset-2 underline">Login</span>
        </a>
    {:else}
        <button
            class="absolute flex items-center"
            on:click={() => showInfo = true}
            in:fade={{ delay: 100, duration: 200 }}
            out:fade={{ duration: 100 }}
        >
            <img class="w-8 h-8 rounded-full" src={activeUser.avatar} alt="Profile"/>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    {/if}
</div>

{#if showInfo}
    <div class="absolute top-0 left-0 flex w-full h-full z-50">
        <button class="w-2/3 h-full bg-transparent" on:click={() => showInfo = false}></button>
        <div
            class="w-1/3 h-full bg-neutral-900 shadow-left py-8 px-4"
            in:fly={{ delay: 100, duration: 300, x: 100, }}
            out:fly={{ delay: 150, duration: 100,  x: 100, }}
        >
            <div class="flex pb-6 px-4 border-b border-gray-600">
                <img
                    class="w-16 h-16 rounded-full mr-4"
                    src={activeUser.avatar}
                    alt=""
                />
                <div class="py-2">
                    <p in:fly={{ delay: 350, duration: 300, x: 100, }} class="text-lg font-semibold text-white">
                        Signed in as <span class="italic text-sky-500">{activeUser.username}</span>
                    </p>
                    <p in:fly={{ delay: 380, duration: 300, x: 100, }} class="text-sm text-gray-500">
                        Last updated {moment(new Date(activeUser.updated_on)).fromNow()}
                    </p>
                </div>
            </div>
            <div class="py-4">
                <div class="text-sm flex justify-end w-full pb-4 px-8">
                    <button class="text-red-500" on:click={onLogout}>Logout</button>
                </div>
                <Notifications/>
            </div>
        </div>
    </div>
{/if}


<style>
    .shadow-left {
        box-shadow: -2px 0px 2px -1px rgba(0,0,0,0.75);
        -webkit-box-shadow: -2px 0px 2px -1px rgba(0,0,0,0.75);
        -moz-box-shadow: -2px 0px 2px -1px rgba(0,0,0,0.75);
    }
</style>