<script>
    import { Jellyfish } from 'svelte-loading-spinners'

    import { onMount } from "svelte";
    import { page } from '$app/stores'

    import {authorizeCode, setToken} from "$lib/http/auth.js";

    const code = $page.query.get('code');

    onMount(() => {
        if (code) {
            authorizeCode(code)
                .then((token) => {
                    console.log(token);
                    setToken(token);
                    window.location.href = "/"
                })
                .catch(() => window.location.href = "/");
        } else {
            window.location.href = "/";
        }
    })
</script>

<div class="flex flex-col justify-center items-center w-full pt-64">
    <Jellyfish size="128" color="#0EA5E9" unit="px" duration="2s"/>
    <h3 class="mt-32 text-xl font-bold">Not long now</h3>
    <p class="mt-3 text-lg">We're just authorizing your account.</p>
</div>
