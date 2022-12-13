<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import TickleWobble from '../utils/TickleWobble.svelte';
	import AdminPage from './AdminPage.svelte';

	export let selectedEnvId = 'bnW56f62WWEJ0bwJwQ0m';

	let envs;
	let cards;

	$: cardsPromise = getDocs(collection(db, 'card-envs', selectedEnvId, 'cards')).then((snapRef) => {
		const prs = snapRef.docs.map((doc) => {
			const d = doc.data();
			return getDocs(
				collection(db, 'card-envs', selectedEnvId, 'cards', d.id, 'activitySubmissions')
			).then((snapRef) => ({ ...d, activitySubmissions: snapRef.docs.map((d) => d.data()) }));
		});
		return Promise.all(prs).then((cs) => (cards = cs));
	});

	$: envsPromise = getDocs(collection(db, 'card-envs')).then((snap) => {
		envs = snap.docs.map((doc) => doc.data());
		return;
	});
</script>

{#await Promise.all([cardsPromise, envsPromise])}
	<TickleWobble />
{:then _}
	<AdminPage
		{...$$props}
		{cards}
		{envs}
		{selectedEnvId}
		onCardsChange={(cs) => (cards = cs)}
		onEnvsChange={(es) => (envs = es)}
	/>
{/await}
