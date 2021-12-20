<script>
    import {onMount} from "svelte";

    import {token, user, loginURL} from "$lib/http/auth.js";

    onMount(() => {
        console.log($token, $user);
        if ($token != null) {
            return;
        }

        window.location.replace(loginURL);
    })
</script>