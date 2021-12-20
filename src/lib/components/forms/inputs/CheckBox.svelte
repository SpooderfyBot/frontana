<script>
    import {fade} from "svelte/transition";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let state = false;
    export let label = '';
    export let reverse = false;
</script>

<div on:click={() => {state = !state; dispatch('click')}} class="cursor-pointer flex {reverse ? 'flex-row-reverse' : ''} items-center">
    <div class="transition duration-150 flex flex-col justify-center items-center rounded-md border-2 {state ? 'border-green-400' : 'border-red-400'} w-6 h-6 px-1">
        {#if state}
            <svg in:fade={{ delay: 100, duration: 200 }} xmlns="http://www.w3.org/2000/svg" class="text-green-400 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
        {:else}
            <svg in:fade={{ delay: 100, duration: 200 }} xmlns="http://www.w3.org/2000/svg" class="text-red-400 h-4 w-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        {/if}
    </div>
    {#if label}
        <p class="text-gray-400 {reverse ? 'mr-2' : 'ml-2'} pb-1">{label}</p>
    {/if}
</div>

