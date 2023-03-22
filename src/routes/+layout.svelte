<script>
	import '../app.css';
	import Notifications from '$lib/components/Notifications/index.svelte';
	import NavBar from '$lib/components/NavBar/index.svelte';

	import { page } from '$app/stores';
	// import ListenAuth from '$lib/components/auth/WithAuth.svelte';
	const w = 800;
	$: route = $page.route?.id;

	// let width = null;
	// let height = null;

	// onMount(() => {
	// 	const resizeObserver = new ResizeObserver((entries) => {
	// 		// We're only watching one element
	// 		const entry = entries.at(0);
	// 		width = entry?.target.clientWidth;
	// 		height = entry?.target.clientHeight;
	// 		console.log('Body height changed:', height, width);
	// 	});

	// 	resizeObserver.observe(document.body);

	// 	// This callback cleans up the observer
	// 	return () => resizeObserver.unobserve(document.body);
	// });
</script>

<Notifications />
<div class="flex flex-col w-full h-full sm:p-3">
	<div
		class="mx-auto sm:border-2 m-auto flex flex-col flex-grow w-full h-full overflow-x-hidden"
		style="max-width:650px; max-height:1000px"
	>
		{#if route !== '/'}
			<NavBar />
		{/if}
		<slot />
	</div>
</div>
<div class="" id="modals" />
<div id="notifications" />

<style>
</style>
