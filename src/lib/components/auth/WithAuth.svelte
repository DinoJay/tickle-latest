<script>
	import { onMount } from 'svelte';
	import { store } from '/src/stores/index';
	import { auth, db } from '$lib/firebaseConfig/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { doc, getDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import TickleWobble from '../utils/TickleWobble.svelte';

	export let onLoaded = () => {
		console.log('loaded');
	};

	/**
	 * Listener on the user auth state
	 * If the user is not in the store, we update the store
	 * If the user is not defined, he can only acces to the pages in the array : allowedNavigation
	 */
	onMount(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				localStorage.clear();
				store.update((obj) => ({ ...obj, currentUser: null }));
				// console.log('currentUser', currentUser);
				goto('/');
				return;
			}
			// if (!$store?.currentUser) {
			getDoc(doc(db, 'users', currentUser.uid)).then((doc) => {
				const u = doc.data();
				store.update((obj) => ({
					...obj,
					currentUser: { ...currentUser, ...u }
				}));
				// .then(() => {
				//TODO hack
				setTimeout(() => {
					onLoaded();
				}, 800);
				// });
			});
			// }
		});
	});
</script>

{#if !!$store.currentUser}
	<slot />
{:else}
	<TickleWobble />
{/if}
