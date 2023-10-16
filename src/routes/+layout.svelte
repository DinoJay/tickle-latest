<script>
	import { EN, NL, FR } from '$lib/constants/locales.js';
	import '../app.css';
	// import Dnd from 'svelte-drag-drop-touch';
	import Notifications from '$lib/components/Notifications/index.svelte';
	import NavBar from '$lib/components/NavBar/index.svelte';

	import { locale } from '/src/stores/localizationStore';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	// import ListenAuth from '$lib/components/auth/WithAuth.svelte';
	const w = 800;
	$: route = $page.route?.id;

	$: selectedEnvId = $page.params.envId;

	const lang = navigator.language || navigator.userLanguage;
	if (lang.includes('en')) locale.set(EN);
	else if (lang.includes('fr')) locale.set(FR);
	else if (lang.includes('nl')) locale.set(NL);
	else locale.set(EN);
</script>

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
