<script>
	import { EN } from '$lib/constants/locales.js';
	import { locale } from 'svelte-i18n';
	import '../app.css';
	// import Dnd from 'svelte-drag-drop-touch';
	import Dnd from '$lib/DragDropTouch.js';
	import Notifications from '$lib/components/Notifications/index.svelte';
	import NavBar from '$lib/components/NavBar/index.svelte';
	import Localize from '$lib/components/Localize/index.svelte';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	// import ListenAuth from '$lib/components/auth/WithAuth.svelte';
	const w = 800;
	$: route = $page.route?.id;

	$: selectedEnvId = $page.params.envId;

	$: console.log('locale', $locale);

	onMount(() => {
		// if (!$locale)

		locale.set(EN);
	});

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

<Localize />
<Notifications />
<div
	class="flex flex-col w-full h-full sm:p-3 bg-cover bg-center"
	style="background-image:url('/city-bg-yellow.png')"
>
	<div
		class="mx-auto bg-white sm:border-2 dim m-auto flex flex-col flex-grow w-full h-full overflow-x-hidden relative"
	>
		{#if route !== '/'}
			<NavBar />
		{/if}
		<!-- <PageTrans cls="flex-grow flex flex-col"> -->
		<slot />
		<!-- </PageTrans> -->
	</div>
</div>
<div class="" id="modals" />
<div id="notifications" />

<style>
	.dim {
		max-width: 650px;
		max-height: 1000px;
	}

	@media screen and (min-width: 640px) {
	}
	@media screen and (min-width: 1024px) {
	}
	@media screen and (min-width: 1580px) {
		.dim {
			max-width: 950px;
			max-height: 1200px;
		}
	}
</style>
