<script>
import LoginButton from "$lib/components/auth/LoginButton.svelte";
</script>

<nav
	class="sticky flex items-center justify-around text-lg h-8 px-8 my-4 text-gray-50"
>
	<section class="h-8 space-x-6">
		<a href="/">Home</a><a href="/about">About</a>
	</section>
	<LoginButton/>
</nav>
