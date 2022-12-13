<script>
	import { page } from '$app/stores';
	import CardViewPage from '$lib/components/cardView/CardView.svelte';
	import ListenUserLocation from '$lib/components/geoLocation/ListenUserLocation.svelte';
	import { collection, getDocs } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import TickleWobble from '$lib/components/utils/TickleWobble.svelte';

	$: selectedEnvId = $page.params.slug;
	$: console.log('id environment', $page.params);

	$: cardsPromise = getDocs(collection(db, 'card-envs', selectedEnvId, 'cards')).then((sn) => {
		return sn.docs.map((doc) => doc.data());
	});
</script>

<ListenUserLocation />
{#await cardsPromise}
	<TickleWobble />
{:then cards}
	<CardViewPage {selectedEnvId} {cards} />
{/await}
