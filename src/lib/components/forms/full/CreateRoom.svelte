<script>
    import General from "$lib/components/forms/full/room/General.svelte";
    import Privacy from "$lib/components/forms/full/room/Privacy.svelte";

    export let roomTitle = '';
    export let roomTopic = '';
    export let roomPublic = false;
    export let roomInviteOnly = false;
</script>

<General bind:roomTitle={roomTitle} bind:roomTopic={roomTopic}/>
<Privacy bind:roomPublic={roomPublic} bind:roomInviteOnly={roomInviteOnly}/>