<script>
import LoginButton from "$lib/components/profile/Profile.svelte";
</script>

<nav
	class="flex items-center justify-around text-lg h-8 px-8 my-4 text-gray-50"
>
	<section class="h-8 space-x-6">
		<a href="/">Home</a><a href="/about">About</a>
	</section>
	<LoginButton/>
</nav>
