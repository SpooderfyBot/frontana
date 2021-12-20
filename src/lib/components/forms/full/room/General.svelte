<script>
    import TextInput from "$lib/components/forms/inputs/TextInput.svelte";
    import GuildSelect from "$lib/components/forms/inputs/GuildSelect.svelte";

    export let roomTitle = '';
    export let roomTopic = '';
    export let roomBanner = '';
</script>

<div class="flex items-center pt-3 pb-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="p-1 rounded-full bg-gray-800 text-gray-300 h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
    </svg>
    <p class="font-semibold text-lg text-gray-300 ml-2">
        General
    </p>
</div>
<div class="flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-4 my-3 w-full">
    <div class="w-full xl:w-4/5">
        <TextInput
                bind:value={roomTitle}
                valid={(roomTitle.length >= 2) && (roomTitle.length <= 32)}
                title="Room name"
                placeholder="Enter the room name..."
                required
        >
            <p class="transition text-xs text-red-400">
                {#if roomTitle.length < 2}
                    The room name must be <span class="italic">at least</span> 2 characters long.
                {:else}
                    The room name must be <span class="italic">under</span> 32 characters long.
                {/if}
            </p>
        </TextInput>
        <div class="transition duration-200 w-full border-2 border-gray-800 hover:border-gray-700 rounded-lg mt-8">
            <GuildSelect/>
        </div>
    </div>
    <div class="w-full space-y-8">
        <TextInput
            bind:value={roomTopic}
            valid={roomTopic.length <= 48}
            title="Room banner"
            placeholder="Maybe add a room topic..."
        >
            <p class="transition text-xs text-red-400">
                The room name must be <span class="italic">under</span> 48 characters long.
            </p>
        </TextInput>
        <TextInput
            bind:value={roomBanner}
            valid={roomBanner === '' || roomBanner.match(/https:\/\/i\.imgur\.com\/[0-9a-z]+\.jpeg|https:\/\/i\.imgur\.com\/[0-9a-z]+\.png|https:\/\/i\.imgur\.com\/[0-9a-z]+\.webp/)}
            title="Room topic"
            placeholder="Maybe add a imgur banner link for your room..."
        >
            <p class="transition text-xs text-red-400">
                The banner link must a direct imgur link. e.g. https://i.imgur.com/TW2AFNV.jpeg
            </p>
        </TextInput>
    </div>
</div>