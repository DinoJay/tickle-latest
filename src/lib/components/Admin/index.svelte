<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import TickleWobble from '../utils/TickleWobble.svelte';
	import AdminPage from './AdminPage.svelte';

	let selectedEnvId = 'bnW56f62WWEJ0bwJwQ0m';

	let envs;
	let cards;

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
		onSelectEnv={(id) => (selectedEnvId = id)}
		onCardsChange={(cs) => (cards = cs)}
		onEnvsChange={(es) => (envs = es)}
	/>
{/await}
