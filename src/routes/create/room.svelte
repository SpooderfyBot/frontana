<script>
    import {BarLoader} from "svelte-loading-spinners";
    import {onMount} from "svelte";
    import {fade} from "svelte/transition";

    import EnsureLogin from "$lib/utils/EnsureLogin.svelte";
    import {authClient, token} from "$lib/http/auth.js";
    import CreateRoom from "$lib/components/forms/full/CreateRoom.svelte";

    let pendingPromise = new Promise(resolve => {});

    const checkRoomRunning = async () => {
        if ($token == null) {
            return;
        }

        const {data} = await $authClient.get("/users/@me/rooms/current");
        console.log(data)
        return data
    }

    onMount(() => {
        pendingPromise = checkRoomRunning();
    })
</script>

<EnsureLogin/>
<div class="flex flex-col rounded-lg bg-gun-bare p-4 w-3/5 h-full mt-16">
    <div class="border-b border-indigo-700 w-full pb-2 px-2">
        <h2 class="text-lg text-gray-300 font-bold">Create room</h2>
    </div>
    <div class="flex flex-col justify-center pt-2">
        {#await pendingPromise}
            <div class="self-center" in:fade={{ delay: 100, duration: 200 }} out:fade={{ duration: 100 }}>
                <BarLoader size="32" color="#0EA5E9" unit="px" duration="1s"/>
            </div>
        {:then existing}
            {#if existing != null}
                <div class="text-center mt-8">
                    <h3 class="text-lg font-bold">Oops! You already have a room created that's active.</h3>
                    <p class="text-gray-400 mt-3">You can join your room by clicking below.</p>
                    <div class="pt-4">
                        <a href="/rooms/{existing.id}" class="transition duration-200 cursor-pointer text-lg px-4 rounded-lg border border-indigo-700 hover:border-indigo-800 pb-2 pt-1 mt-4">Go to room</a>
                    </div>
                </div>
            {:else}
                <CreateRoom/>
            {/if}
        {/await}
    </div>
</div>
