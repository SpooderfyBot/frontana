<script>
    import {createEventDispatcher} from "svelte";
    import CheckBox from "$lib/components/forms/inputs/CheckBox.svelte";

    const dispatch = createEventDispatcher();

    export let roomPublic = false;
    export let roomInviteOnly = false;

    const onChange = () => dispatch('change');

    const publicClick = () => {
        if (roomInviteOnly) {
            roomInviteOnly = false;
        }

        onChange();
    }

    const inviteToggle = () => {
        if (roomPublic) {
            roomPublic = false;
        }

        onChange();
    }
</script>

<div class="flex items-center pt-3 pb-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="p-1 rounded-full bg-gray-800 text-gray-300 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
    </svg>
    <p class="font-semibold text-lg text-gray-300 ml-2">
        Privacy
    </p>
</div>
<div class="flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-4 w-full">
    <CheckBox on:click={publicClick} bind:state={roomPublic} label="Room public?" reverse/>
    <CheckBox on:click={inviteToggle} bind:state={roomInviteOnly} label="Room invite only?" reverse/>
</div>