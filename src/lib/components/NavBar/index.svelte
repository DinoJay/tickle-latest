<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { store } from '/src/stores/index';
	import { getAuth, signOut } from 'firebase/auth';
	import { afterNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/components/utils/clickOutside';
	import Logo from './Logo.svelte';
	import Burger from './Burger.svelte';

	$: selectedEnvId = $page.params.envId || '';
	$: console.log('page', $page);
	// $: adminEnvId = $store.currentUser?.adminEnvId;

	$: currentRoute = $page?.route?.id;
	const adminRoute = '/admin/[[envId]]';

	let collapsed = false;

	let sections = [
		{
			name: 'Select environments/User View',
			go: () => {
				goto(`/cardview/environment/${currentRoute === adminRoute ? selectedEnvId : ''}`);
			}
		},
		// { name: 'Home', go: () => goto('/home') },
		//TODO: change this later
		{ name: 'Diary', go: () => goto(`/diary/${selectedEnvId}`) },
		{ name: 'Admin', go: () => goto(`/admin/${selectedEnvId}`) },

		{ name: 'Sign out', go: () => logOut() }
	];

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
		goto('/').then((d) => signOut(getAuth()));
	};
</script>

<nav
	class="flex items-center h-16 w-full  
		bg-gray-500 text-white relative"
	use:clickOutside
	on:click_outside={() => (collapsed = false)}
>
	<Logo onClick={() => logOut()} />

	{#if $store?.currentUser}
		<div class="absolute right-3 top-4 ">
			<Burger bind:collapsed />
		</div>

		{#if collapsed}
			<div
				transition:fly={{ x: 400, duration: 500, opacity: 1 }}
				class="flex flex-col h-auto sm:w-[40%] w-full  
				 	absolute top-[4rem] right-0 z-20
					bg-gray-500 "
			>
				{#each sections as section}
					<button class="sm:text-xl text-2xl border-b hover:underline p-2" on:click={section.go}>
						{section.name}
					</button>
				{/each}
			</div>
		{/if}
	{/if}
</nav>
