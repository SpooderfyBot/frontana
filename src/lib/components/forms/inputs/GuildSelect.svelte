<script>
    import {onMount} from "svelte";
    import Select from 'svelte-select';
    import {writable} from "svelte/store";

    import Item from "$lib/components/forms/inputs/select/Item.svelte";
    import Selection from "$lib/components/forms/inputs/select/Selection.svelte";

    import {getGuilds} from "$lib/http/guilds.js";
    import {token} from "$lib/http/auth.js";

    export let guild = null;

    let loadedGuilds = false;
    let guilds = writable(null);
    onMount(async () => {
        let g = await getGuilds($token);

        guilds.set(g);
        loadedGuilds = true;
    });

    function handleSelect(event) {
        guild = event.detail;
    }
</script>


<div class="relative themed">
    <Select
            optionIdentifier="id"
            labelIdentifier="name"
            items={$guilds}
            isWaiting={$guilds == null}
            listPlacement="bottom"
            noOptionsMessage={$guilds ? "No servers matched that search." : "You don't control any servers."}
            placeholder="Maybe link a server to enjoy the stream with."
            on:select={handleSelect}
            on:clear={() => guild = null}
            {Item}
            {Selection}
    />
    <div class="absolute top-0 left-0 transform -translate-y-3 ml-4 bg-gun-bare px-1">
        <p class="text-sm font-semibold text-gray-400">Link Community</p>
    </div>
</div>

<style>
    .themed {
        --inputPadding: 0.5rem;
        --inputFontSize: 1rem;
        --background: rgb(13 17 23);
        --border: #1F2937;
        --borderHoverColor: rgb(55 65 81);
        --borderFocusColor: var(--borderHoverColor);
        --borderRadius: 0.375rem;
        --placeholderColor: rgb(156 163 175);
        --clearSelectColor: var(--border);
        --clearSelectHoverColor: var(--borderHoverColor);
        --clearSelectFocusColor: var(--borderHoverColor);
        --listBackground: var(--background);
        --listBorderRadius: 0.5rem;
        --listBorder: 2px solid var(--borderHoverColor);
        --itemActiveBackground: var(--background);
        --itemIsActiveBG: var(--background);
        --itemHoverBG: var(--background);
        --itemColor: var(--placeholderColor);
        --itemPadding: 0rem 0.5rem;
    }
</style>