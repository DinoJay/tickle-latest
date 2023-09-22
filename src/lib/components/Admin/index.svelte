<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
	import { store } from '/src/stores/index';
	import TickleWobble from '../utils/TickleWobble.svelte';
	import AdminPage from './AdminPage.svelte';
	import { updateStoreUser } from '/src/stores/index';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	/**
	 * @type {string}
	 */
	export let envId;
	let envs;
	let cards;

	$: user = $store.currentUser;
	let selectedEnvId = 'bnW56f62WWEJ0bwJwQ0m';

	$: selectedEnvId = envId || user?.selectedAdminEnvId || 'bnW56f62WWEJ0bwJwQ0m';

	let topics;
	$: {
		cards = undefined;
		getDocs(collection(db, 'card-envs', selectedEnvId, 'cards')).then((snapRef) => {
			Promise.all(
				snapRef.docs.map((doc) => {
					const d = doc.data();
					return getDocs(
						collection(db, 'card-envs', selectedEnvId, 'cards', d.id, 'activitySubmissions')
					).then((snapRef) => ({ ...d, activitySubmissions: snapRef.docs.map((d) => d.data()) }));
				})
			).then((cs) => {
				cards = cs;
				return;
			});
			return;
		});
		topics = undefined;
		getDocs(collection(db, 'card-envs', selectedEnvId, 'topics')).then((snap) => {
			const ts = snap.docs.map((doc) => doc.data());
			topics = ts;
			return;
		});
	}
	// onMount(() => {
	$: getDocs(collection(db, 'card-envs')).then((snap) => {
		envs = snap.docs.map((doc) => doc.data());
		return;
	});
	// });

	// $: console.log('selectedEnvId', selectedEnvId);
	// $: prs = Promise.all([envsPromise, cardsPromise, envsPromise]);
</script>

{#if !envs}
	<TickleWobble />
{:else}
	<AdminPage
		{...$$props}
		{cards}
		{envs}
		{selectedEnvId}
		{topics}
		onSelectEnv={(id) => {
			const userRef = doc(db, 'users', user.uid);
			setDoc(userRef, { selectedAdminEnvId: id }, { merge: true });
			updateStoreUser({ selectedAdminEnvId: id });
			console.log('user', user);
			// envId = id;
			goto(`/admin/${id}`);
		}}
		onCardsChange={(cs) => (cards = cs)}
		onEnvsChange={(es) => (envs = es)}
		onTopicsChange={(ts) => (topics = ts)}
	/>
{/if}
