<script>
    import { SyncLoader } from 'svelte-loading-spinners'

    import {onMount} from "svelte";
    import { page } from '$app/stores'
    import {fade} from 'svelte/transition';

    import {exchangeCode, logout, loginURL, token, user, fetchUser} from "$lib/http/auth.js";

    onMount(async () => {
        token.set(localStorage.getItem("session") || null);

        if ($token != null) {
            const u = await fetchUser($token);
            user.set(u);
            return;
        }

        if ($page.path !== "/auth/authorized") {
            return
        }

        let code = $page.query.get("code");

        if (code == null) {
            window.location.href = "/";
            return;
        }

        const t = await exchangeCode(code);
        token.set(t);

        const u = await fetchUser($token);
        user.set(u);

        window.location.href = "/";
    })

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
        <div class="absolute" in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
            <button on:click={onLogout}>Logout</button>
        </div>
    {/if}
</div>

