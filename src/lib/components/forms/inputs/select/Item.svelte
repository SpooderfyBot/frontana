<script>
    export let item = undefined;

    console.log(item)
</script>

<div class="flex items-center cursor-pointer text-gray-400 hover:text-gray-100 px-2 py-1.5">
    {#if item.picture != null}
        <img class="w-6 h-6 rounded-full mr-2" src={item.picture} alt="">
    {:else}
        <div class="flex items-center justify-center w-6 h-6 rounded-full bg-gray-800 mr-2">
            {item.name[0]}
        </div>
    {/if}
    <p>{item.name}</p>
</div>