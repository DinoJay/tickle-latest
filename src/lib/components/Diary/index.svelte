<script>
	// import { page } from '$app/stores';
	import DiaryPage from './DiaryPage.svelte';
	import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import TickleWobble from '$lib/components/utils/TickleWobble.svelte';
	import TinyEnvSelect from './TinyEnvSelect.svelte';
	// import Map from '$lib/components/map/Map.svelte';
	import Map from '$lib/components/map/Map.svelte';

	export let selectedEnvId;
	export let selectedCardId;
	export let extended;
	/**
	 * @type {{ uid: string; avatar: any; }}
	 */
	export let user;

	// $: console.log('id environment', $page);

	$: console.log('user', user);
	$: loadData = async () => {
		const sn = await getDocs(collection(db, 'card-envs', selectedEnvId, 'cards'));

		const tmp = await Promise.all(
			sn.docs
				.map((d) => d.data())
				.map(async (d) => {
					// console.log('doc', d);
					const ref = doc(
						db,
						'card-envs',
						selectedEnvId,
						'cards',
						d.id,
						'activitySubmissions',
						user.uid
					);
					const docSub = await getDoc(ref);
					console.log('docSub', docSub.exists());

					return docSub.exists() ? d : null;
				})
		);
		const tmpCards = tmp.filter((d) => d);

		const topixSnap = await getDocs(collection(db, 'card-envs', selectedEnvId, 'topics'));
		const topix = topixSnap.docs.map((doc) => doc.data());
		console.log('user', user);
		const cards = tmpCards.map((c) => ({
			...c,
			topics: topix.filter((t) => c.topics.includes(t.id))
		}));

		return [cards, topix];
		// return [cs, []];
	};
	$: promise = selectedEnvId ? loadData() : null;
</script>

<div class="flex-grow flex flex-col m-2  mx-auto p-3 w-full sm:w-diary">
	<h1 class="text-2xl mb-2">{user.email}</h1>
	<div class="relative mb-3" style="height:300px">
		<Map recenter={false} />
	</div>
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
