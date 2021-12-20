<script>
	import Nav from '$lib/Nav.svelte';
    import PageTransition from '$lib/transitions/PageTransition.svelte';

	import '../style.css';

	export let key;
</script>

<Nav />
<PageTransition refresh={key}>
	<div class="flex flex-col items-center w-full h-full">
		<slot />
	</div>
</PageTransition>
