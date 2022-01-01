<script>
    import ConnectionStatus from "$lib/components/player/stats/ConnectionStatus.svelte";

    export let viewerCount = 0;
</script>


<div class="flex items-center justify-between w-full">
    <ConnectionStatus/>
    <div class="text-red-400">
        {viewerCount}
        Watching
    </div>
</div>
