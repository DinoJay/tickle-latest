<script>
	// import { page } from '$app/stores';
	import DiaryPage from './DiaryPage.svelte';
	import { collection, getDocs } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import TickleWobble from '$lib/components/utils/TickleWobble.svelte';
	import TinyEnvSelect from './TinyEnvSelect.svelte';

	export let selectedEnvId;
	export let selectedCardId;
	export let extended;

	// $: console.log('id environment', $page);

	$: loadData = () =>
		getDocs(collection(db, 'card-envs', selectedEnvId, 'cards')).then((sn) => {
			const cs = sn.docs.map((doc) => doc.data());
			return getDocs(collection(db, 'card-envs', selectedEnvId, 'topics'))
				.then((sn) => {
					return sn.docs.map((doc) => doc.data());
				})
				.then((topix) => {
					const cards = cs.map((c) => ({
						...c,
						topics: topix.filter((t) => c.topics.includes(t.id))
					}));
					console.log('cards', cards, 'topix', topix);
					return [cards, topix];
				});
		});

	$: promise = selectedEnvId ? loadData() : null;
</script>

<div class="flex-grow flex flex-col m-2">
	<TinyEnvSelect {selectedEnvId} />
	<div class="flex-grow flex flex-col">
		{#if promise !== null}
			{#await promise}
				<TickleWobble />
			{:then [cards, topics]}
				<DiaryPage {cards} {topics} {selectedEnvId} {selectedCardId} {extended} />
			{/await}
		{:else}
			<div class="text-2xl m-auto">Please select an Environment</div>
		{/if}
	</div>
</div>
