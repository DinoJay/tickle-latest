<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
	import { store } from '/src/stores/index';
	import TickleWobble from '../utils/TickleWobble.svelte';
	import AdminPage from './AdminPage.svelte';
	import { updateStoreUser } from '/src/stores/index';
	import { goto } from '$app/navigation';

	/**
	 * @type {string}
	 */
	export let envId;
	let envs;
	let cards;

	$: user = $store.currentUser;
	let selectedEnvId = 'bnW56f62WWEJ0bwJwQ0m';

	$: selectedEnvId = envId || user?.selectedAdminEnvId || 'bnW56f62WWEJ0bwJwQ0m';

	$: console.log('user', user);

	$: cardsPromise = getDocs(collection(db, 'card-envs', selectedEnvId, 'cards')).then((snapRef) => {
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

	$: envsPromise = getDocs(collection(db, 'card-envs')).then((snap) => {
		envs = snap.docs.map((doc) => doc.data());
		return;
	});

	// $: prs = Promise.all([cardsPromise, envsPromise]);
</script>

{#await envsPromise}
	<TickleWobble />
{:then _}
	<AdminPage
		{...$$props}
		{cards}
		{envs}
		{selectedEnvId}
		onSelectEnv={(id) => {
			const userRef = doc(db, 'users', user.uid);
			setDoc(userRef, { selectedAdminEnvId: id }, { merge: true });
			updateStoreUser({ selectedAdminEnvId: id });
			console.log('user', user);
			goto(`/admin/${id}`);
		}}
		onCardsChange={(cs) => (cards = cs)}
		onEnvsChange={(es) => (envs = es)}
	/>
{/await}
