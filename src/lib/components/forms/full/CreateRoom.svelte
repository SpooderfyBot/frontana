<script>
    import {fade} from 'svelte/transition';
    import {BarLoader} from "svelte-loading-spinners";

    import General from "$lib/components/forms/full/room/General.svelte";
    import Privacy from "$lib/components/forms/full/room/Privacy.svelte";
    import {authClient} from "$lib/http/auth.js";

    export let roomTitle = '';
    export let roomTopic = '';
    export let roomBanner = '';
    export let roomGuild = null;
    export let roomPublic = false;
    export let roomInviteOnly = false;

    const isValid = () => (
        (roomTitle.length >= 2 && roomTitle.length <= 32)
        && ((roomTopic.length === 0) || (roomTopic.length >= 2 && roomTopic.length <= 128))
        && (roomBanner === '' || roomBanner.match(/https:\/\/i\.imgur\.com\/[0-9a-z]+\.jpeg|https:\/\/i\.imgur\.com\/[0-9a-z]+\.png|https:\/\/i\.imgur\.com\/[0-9a-z]+\.webp/))
    )

    let valid = isValid();
    const onChange = () => {
        console.log(roomTitle, roomBanner, roomBanner)
        valid = isValid();
    }

    let pendingSubmit = null;
    const submit = async () => {
        const {data} = await $authClient.post(
            "/rooms",
            {
                title: roomTitle,
                topic: roomTopic || null,
                is_public: roomPublic,
                invite_only: roomInviteOnly,
                guild_id: roomGuild?.id || null,
                banner: roomBanner || null,
            }
        );

        window.location.replace(`/rooms/${data.id}`)
    }
</script>

<div class="transition transition-all duration-150 w-full">
    <General on:change={onChange} bind:roomTitle={roomTitle} bind:roomTopic={roomTopic} bind:roomBanner={roomBanner} bind:roomGuild={roomGuild}/>
    <Privacy on:change={onChange} bind:roomPublic={roomPublic} bind:roomInviteOnly={roomInviteOnly}/>
    <div class="flex items-center justify-end w-full mt-4">
        {#if pendingSubmit === null}
            <button
                    in:fade={{ delay: 100, duration: 200 }}
                    on:click={() => {
                        if (valid) {
                            pendingSubmit = submit();
                        }
                    }}
                    class="text-center w-20 h-8 transition border font-semibold hover:text-hover-400 focus:text-hover-400 {valid ? 'cursor-pointer text-gray-100 border-indigo-500' : 'cursor-not-allowed text-gray-500 border-indigo-800'}  focus:border-indigo-800 shadow-md rounded-md pb-1">
                Create!
            </button>
        {:else}
            <div class="flex items-center justify-center border border-indigo-800 shadow-md rounded-md w-20 h-8 px-4" in:fade={{ delay: 100, duration: 200 }}>
                <BarLoader size="32" color="#0EA5E9" unit="px" duration="1s"/>
            </div>
        {/if}
    </div>
</div>