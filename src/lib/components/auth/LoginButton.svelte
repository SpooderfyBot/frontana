<script>
    import { SyncLoader } from 'svelte-loading-spinners'

    import {fade} from 'svelte/transition';

    import {fetchUser, loginURL, logout} from "$lib/http/auth.js";

    let pending = fetchUser();
</script>


<div class="relative flex items-center justify-center h-10 w-48">
    {#await pending}
        <div in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
            <SyncLoader size="24" color="#0EA5E9" unit="px" duration="1s"/>
        </div>
    {:then user}
        {#if user === null}
            <a class="absolute" href={loginURL} in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
                <img class="inline-block w-5 h-5 mr-1" src="/icons/discord/logo-white.svg" alt=""/>
                <span class="decoration-sky-500 decoration-2 underline-offset-2 underline">Login</span>
            </a>
        {:else}
            <div class="absolute" in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
                <button on:click={() => {logout(); pending = fetchUser()}}>Logout</button>
            </div>
        {/if}
    {/await}
</div>

