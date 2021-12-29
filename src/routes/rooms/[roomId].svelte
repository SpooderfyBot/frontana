<script>
    import {onMount} from "svelte";
    import {fade} from "svelte/transition";
    import {Jellyfish} from "svelte-loading-spinners";

    import { page } from '$app/stores'
    import {authClient, token, user} from "$lib/http/auth.js";
    import VideoPlayer from "$lib/components/player/VideoPlayer.svelte";

    const roomId = $page.params.roomId;

    let targetNavPage = 1;
    let playlist = []

    let pendingPromise = new Promise(resolve => {});
    const checkRoomRunning = async () => {
        if ($token == null) {
            return;
        }

        const {data} = await $authClient.get(
            "/rooms/info",
            {
                params: { id: roomId }
            }
        );
        console.log(data)
        return data
    }

    onMount(() => {
        pendingPromise = checkRoomRunning();
    })
</script>


<div class="flex flex-col items-center w-4/5 pt-4">
    {#await pendingPromise}
        <div class="self-center pt-20" in:fade={{ delay: 100, duration: 200 }}>
            <Jellyfish size="128" color="#0EA5E9" unit="px" duration="2s"/>
        </div>
    {:then room}
        <div in:fade={{ delay: 100, duration: 200 }} class="border-b border-indigo-700 w-full pt-16 px-8 pb-2">
            <h3 class="text-2xl font-bold text-gray-100">{ room.title }</h3>
        </div>
        <div class="flex justify-center w-full p-4">
            <div class="pb-4 pr-4 w-2/3 min-h-[24rem]">
                <VideoPlayer/>
            </div>
            <div class="flex flex-col items-center justify-between h-full w-1/3 px-4">
                <div id="nav" class="flex items-center justify-between w-full border-b border-gray-800 pb-2 mb-4 px-2">
                    <div class="flex items-center space-x-8 transition-all duration-200">
                        <button class="flex font-semibold items-center  {targetNavPage === 1 ? 'text-gray-200' : 'text-gray-400'}" on:click={() => targetNavPage = 1}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 class="transition border-2 {targetNavPage === 1 ? 'bg-transparent border-gray-200 text-gray-200' : 'border-transparent bg-gray-800 text-gray-400'} rounded-full p-1 h-8 w-8 mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            Chat
                        </button>
                        <button class="flex font-semibold items-center {targetNavPage === 2 ? 'text-gray-200' : 'text-gray-400'} " on:click={() => targetNavPage = 2}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 class="transition border-2 {targetNavPage === 2 ? 'bg-transparent border-gray-200 text-gray-200' : 'border-transparent bg-gray-800 text-gray-400'} rounded-full p-1 h-8 w-8 mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                            </svg>
                            Playlist
                        </button>
                    </div>
                    <button class="ml-auto" on:click={() => targetNavPage = 3}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="transition border-2 {targetNavPage === 3 ? 'bg-transparent border-gray-200 text-gray-200' : 'border-transparent bg-gray-800 text-gray-400'} rounded-full p-1 h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="flex flex-col overflow-y-auto h-full w-full">
                    <div class="flex">
                        <!-- LOL this is a hack -->
                        <div class="flex flex-col items-center justify-start">
                            <img class="w-12 h-12 rounded-full" src={$user.picture} alt=""/>
                        </div>
                        <div class="flex flex-col pl-2 pt-0.5">
                            <p class="text-sm font-semibold">{$user.name}</p>
                            <p class="text-sm text-gray-400">Hello World!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/await}
</div>