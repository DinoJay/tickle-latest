<script>
	// import { page } from '$app/stores';
	import CardViewPage from '$lib/components/CardView/CardViewPage.svelte';
	import ListenUserLocation from '$lib/components/geoLocation/ListenUserLocation.svelte';
	import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import TickleWobble from '$lib/components/utils/TickleWobble.svelte';

	import { store } from '/src/stores/index';

	export let selectedEnvId;

	// $: console.log('id environment', $page);

	$: promise = getDoc(doc(db, 'card-envs', selectedEnvId)).then((docSnap) => {
		console.log('docSnap', docSnap.data());
		const selectedEnv = docSnap?.data();
		return getDocs(collection(db, 'card-envs', selectedEnvId, 'cards')).then((sn) => {
			const cs = sn.docs.map((doc) => doc.data());
			return getDocs(collection(db, 'card-envs', selectedEnvId, 'topics'))
				.then((sn) => {
					return sn.docs.map((doc) => doc.data());
				})
				.then((topix) => {
					const cards = cs.map((c) => ({
						...c,
						topics: topix.filter((t) => c.topics?.includes(t.id)),
						topicIds: c.topics
					}));
					console.log('cards', cards, 'topix', topix);
					return [cards, topix, selectedEnv];
				});
		});
	});
</script>

<ListenUserLocation />
{#await promise}
	<TickleWobble />
{:then [cards, topics, selectedEnv]}
	<CardViewPage {...$$props} {cards} {topics} {selectedEnv} />
{/await}
