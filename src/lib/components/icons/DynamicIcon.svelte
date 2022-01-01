<script>
    export let icon;

    const classInfo = "w-8 h-8"
</script>


{#if icon === "news"}
    <img class={classInfo} src="/icons/fire.png" alt=""/>
{:else if icon === "premium"}
    <img class={classInfo} src="/icons/heart.png" alt=""/>
{:else if icon === "info"}
    <img class={classInfo} src="/icons/info.png" alt=""/>
{:else if icon === "coins"}
    <img class={classInfo} src="/icons/coins.png" alt=""/>
{:else if icon === "issues"}
    <img class={classInfo} src="/icons/issues.png" alt=""/>
{:else if icon === "discord"}
    <img class="w-6 h-6 mt-1" src="/icons/discord/logo-white.svg" alt=""/>
{/if}