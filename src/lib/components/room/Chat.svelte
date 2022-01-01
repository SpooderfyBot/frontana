<script>
    import {user} from "$lib/http/auth.js";
    import {fade} from "svelte/transition";
</script>

<div in:fade={{ delay: 100, duration: 100 }} class="w-full h-full">
    <div class="flex flex-col overflow-y-auto h-full w-full">
        <div class="flex">
            <!-- LOL this is a hack -->
            <div class="flex flex-col items-center justify-start">
                <img class="w-12 h-12 rounded-full" src={$user.avatar} alt=""/>
            </div>
            <div class="flex flex-col pl-2 pt-0.5">
                <p class="text-sm font-semibold">{$user.username}</p>
                <p class="text-sm text-gray-400">Hello World!</p>
            </div>
        </div>
    </div>
</div>
