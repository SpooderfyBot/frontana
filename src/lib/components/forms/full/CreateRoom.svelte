<script>
    import General from "$lib/components/forms/full/room/General.svelte";
    import Privacy from "$lib/components/forms/full/room/Privacy.svelte";

    export let roomTitle = '';
    export let roomTopic = '';
    export let roomBanner = '';
    export let roomGuild = null;
    export let roomPublic = false;
    export let roomInviteOnly = false;

    const isValid = () => (
        (roomTitle.length >= 2 && roomTitle.length <= 32)
        && (roomTopic.length <= 48)
        && (roomBanner === '' || roomBanner.match(/https:\/\/i\.imgur\.com\/[0-9a-z]+\.jpeg|https:\/\/i\.imgur\.com\/[0-9a-z]+\.png|https:\/\/i\.imgur\.com\/[0-9a-z]+\.webp/))
    )

    let valid = isValid();
    const onChange = () => {
        console.log(roomTitle, roomBanner, roomBanner)
        valid = isValid();
    }
</script>

<div class="transition transition-all duration-150 w-full">
    <General on:change={onChange} bind:roomTitle={roomTitle} bind:roomTopic={roomTopic} bind:roomBanner={roomBanner} bind:roomGuild={roomGuild}/>
    <Privacy on:change={onChange} bind:roomPublic={roomPublic} bind:roomInviteOnly={roomInviteOnly}/>
    <div class="flex items-center justify-end w-full mt-4">
        <button class="transition border font-semibold hover:text-hover-400 focus:text-hover-400 {valid ? 'cursor-pointer text-gray-100 border-indigo-500' : 'cursor-not-allowed text-gray-500 border-indigo-800'}  focus:border-indigo-800 shadow-md rounded-md px-4 py-1">
            Create!
        </button>
    </div>
</div>