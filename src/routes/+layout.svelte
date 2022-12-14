<script>
	import '../app.css';
	import Notifications from '$lib/components/Notifications/index.svelte';
	import NavBar from '$lib/components/NavBar/index.svelte';
	// import ListenAuth from '$lib/components/auth/WithAuth.svelte';
	const w = 800;
	export const ssr = false;
</script>

<!-- <ListenAuth> -->
<Notifications>
	<div class="flex flex-col">
		<div
			class="mx-auto sm:border-2 flex flex-col flex-grow h-screen w-screen overflow-x-hidden"
			style="max-width:800px; max-height:800px"
		>
			<NavBar />
			<slot />
		</div>
	</div>
	<div class="" id="modals" />
	<div id="notifications" />
</Notifications>

<!-- </ListenAuth> -->
<style>
</style>
