<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    export let refresh = ""

    let animations = false;
    onMount(() => (
        animations = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true
            || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches !== true
    ));
</script>

{#key refresh}
    {#if !!animations}
        <!-- You can modify the in:fly and out:fly attributes to your liking! -->
        <div in:fly={{ delay: 100, duration: 200, y: -10, }} out:fly={{ duration: 100,  y: 10, }}>
            <slot />
        </div>
    {:else}
        <slot />
    {/if}
{/key}