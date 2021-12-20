<script>
    import General from "$lib/components/forms/full/room/General.svelte";
    import Privacy from "$lib/components/forms/full/room/Privacy.svelte";

    export let roomTitle = '';
    export let roomTopic = '';
    export let roomBanner = '';
    export let roomGuild = null;
    export let roomPublic = false;
    export let roomInviteOnly = false;
</script>

<div class="transition transition-all duration-150 w-full">
    <General bind:roomTitle={roomTitle} bind:roomTopic={roomTopic} bind:roomBanner={roomBanner} bind:roomGuild={roomGuild}/>
    <Privacy bind:roomPublic={roomPublic} bind:roomInviteOnly={roomInviteOnly}/>
    <div class="flex items-center justify-end w-full mt-4">
        <button class="transition border font-semibold text-gray-100 hover:text-gray-400 focus:text-hover-500 border-indigo-500 focus:border-indigo-800 shadow-md rounded-md px-4 py-1">Create!</button>
    </div>
</div>