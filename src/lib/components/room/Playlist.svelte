<script>
    import {fade} from "svelte/transition";

    export let playlistIds = null;
</script>

<div in:fade={{ delay: 100, duration: 100 }} class="w-full h-full">
    Playlist
</div>
