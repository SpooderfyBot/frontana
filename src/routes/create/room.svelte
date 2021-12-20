<script>
    import {BarLoader} from "svelte-loading-spinners";
    import {onMount} from "svelte";
    import {fade} from "svelte/transition";

    import EnsureLogin from "$lib/utils/EnsureLogin.svelte";
    import {getCurrentRoom} from "$lib/http/rooms.js";
    import {token} from "$lib/http/auth.js";
    import TextInput from "$lib/components/forms/inputs/TextInput.svelte";
    import CreateRoom from "$lib/components/forms/full/CreateRoom.svelte";

    let pendingPromise = new Promise(resolve => {});

    const checkRoomRunning = async () => {
        if ($token == null) {
            return;
        }

        const existing = await getCurrentRoom($token);

        return existing
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
                <div class="text-center">
                    <h3>Oops! You already have a room created that's active.</h3>
                    <p>You can join your room by <a href="/rooms/{existing.id}">clicking here</a></p>
                </div>
            {:else}
                <CreateRoom/>
            {/if}
        {/await}
    </div>
</div>
