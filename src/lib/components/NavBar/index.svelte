<script>
	import { langDict } from './../../../stores/localizationStore.js';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { store } from '/src/stores/index';
	import { getAuth, signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/components/utils/clickOutside';
	import Logo from './Logo.svelte';
	import Burger from './Burger.svelte';
	import { doc, getDoc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import { locale, titleLocale } from '/src/stores/localizationStore';

	$: selectedEnvId = $page.params.envId !== 'null' ? $page.params.envId : null;
	// $: console.log('page', $page);
	// $: adminEnvId = $store.currentUser?.adminEnvId;

	$: currentRoute = $page?.route?.id;
	const adminRoute = '/admin/[[envId]]';

	let collapsed = true;
	let env = null;
	$: envPromise = selectedEnvId
		? getDoc(doc(db, 'card-envs', selectedEnvId)).then((d) => d.data())
		: null;

	$: console.log('current', $store.currentUser);

	$: sections = [
		{
			name: 'Select environments/User View',
			go: () => {
				if (currentRoute === adminRoute && selectedEnvId)
					goto(`/cardview/environment/${selectedEnvId}/null/false/true`);
				else goto(`/cardview/environment/null/null/false/true`);
			}
		},
		{ name: 'Diary', go: () => goto(`/diary/${selectedEnvId || ''}`), visible: true },
		{
			name: 'Admin',
			go: () => goto(`/admin/${selectedEnvId || ''}`)
		},

		{
			name: 'Teacher',
			go: () => goto(`/teacher/${selectedEnvId || ''}`)
		},

		{ name: $langDict.sign_out, go: () => logOut() }
	];

	$: console.log('sections', sections);

	/**
	 * Dynamic method to catch the size of the screen
	 * 0.4 - full screen mode => nav 40% of the screen
	 */
	// onMount(() => {
	// 	const getMobileNavWidth = () => {
	// 		if (window.innerWidth > 640) {
	// 			mobileNavWidth = window.innerWidth * 0.4;
	// 		} else {
	// 			mobileNavWidth = window.innerWidth;
	// 		}
	// 	};

	// 	getMobileNavWidth();
	// 	window.addEventListener('resize', () => {
	// 		getMobileNavWidth();
	// 	});
	// });

	/**
	 * Reset the Navbar after a 'goto' redirection
	 */
	// afterNavigate(() => {
	// 	collapsed = false;
	// 	selectEnvOpen = false;
	// });

	/**
	 * Function use to logout the user
	 */
	const logOut = () => {
		signOut(getAuth());
		// goto('/').then((d) => signOut(getAuth()));
	};
</script>

<nav
	class="flex items-center h-16 w-full bg-gray-700 text-white z-50"
	use:clickOutside
	on:click_outside={() => (collapsed = true)}
>
	<div class="flex-grow flex relative items-end">
		<Logo onClick={() => logOut()} />

		{#await envPromise then env}
			<div class="mb-3">{env?.[$titleLocale] || env?.title || ''}</div>

			<div class="ml-auto relative mr-3 my-auto">
				{#if $store?.currentUser}
					<Burger bind:collapsed />
				{/if}
			</div>
			{#if !collapsed}
				<div
					transition:fly={{ x: 400, duration: 500, opacity: 1 }}
					class="flex flex-col h-auto w-screen max-w-xs absolute top-[4.1rem] right-0 z-50 bg-gray-700"
				>
					{#each sections.filter((d) => {
						if (d.name === 'Admin') return $store.currentUser?.admin;
						if (d.name === 'Teacher') return $store.currentUser?.teacher;
						return true;
					}) as section}
						<button
							class="sm:text-xl text-2xl border-b hover:underline p-2"
							on:click={(e) => {
								// e.stopPropagation();
								collapsed = true;
								section.go();
							}}
						>
							{section.name}
						</button>
					{/each}
					{#if env?.langs}
						<div class="flex sm:text-xl text-xl border-b hover:underline p-2">
							<div class="m-auto flex gap-1">
								{#each env?.langs as l}
									<button
										on:click={() => locale.set(l)}
										class="border-2 p-1"
										class:btn-selected={$locale === l}>{l.toUpperCase()}</button
									>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/if}
		{/await}
	</div>
</nav>

<style>
	.btn-selected {
		@apply bg-white text-gray-700;
	}
</style>
