<script>
    import {fade} from "svelte/transition";

    export let title;
    export let placeholder;
    export let required = false;
    export let valid = true;

    export let value = '';
</script>

<div class="relative w-full">
    <input bind:value={value}
           type="text"
           class="transition rounded-md border-2 border-gray-800 hover:border-gray-700 focus:border-gray-700 bg-transparent outline-none focus:outline-none w-full p-2"
           placeholder={placeholder}
    />
    <div class="absolute top-0 left-0 transform -translate-y-3 ml-4 bg-gun-bare px-1">
        <p class="transition text-sm font-semibold text-gray-400">
            {title}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </p>
    </div>
    {#if !valid}
        <div
            in:fade={{ delay: 100, duration: 200 }}
            out:fade={{ duration: 100 }}
            class="absolute bottom-0 left-0 transform translate-y-1 ml-4 bg-gun-bare px-1"
        >
            <slot/>
        </div>
    {/if}
</div>