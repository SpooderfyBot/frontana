<script>
import LoginButton from "$lib/components/profile/Profile.svelte";
</script>

<nav
	class="flex items-center justify-around text-lg px-8 py-2 border-b border-gray-700 text-gray-50"
>
	<a href="/" class="text-lg font-bold">
		<img class="inline-block w-8 h-8 rounded-full" src="/icons/logo-512.png" alt=""/>
		Spooderfy
	</a>
	<section class="font-semibold h-8 space-x-6 pl-8">
		<a href="/browse" class="transition duration-150 hover:text-gray-400">Browse</a>
		<a href="/invite" class="transition duration-150 hover:text-gray-400">Invite</a>
		<a href="/create/room" class="transition duration-150 hover:text-gray-400">Create Room</a>
	</section>
	<LoginButton/>
</nav>
