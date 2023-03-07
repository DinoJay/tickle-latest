<script>
	// import { page } from '$app/stores';
	import CollectedCards from './CollectedCards.svelte';
	import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import TickleWobble from '$lib/components/utils/TickleWobble.svelte';
	import TinyEnvSelect from './TinyEnvSelect.svelte';
	// import Map from '$lib/components/map/Map.svelte';
	import Map from '$lib/components/map/Map.svelte';

	import ListenUserLocation from '$lib/components/geoLocation/ListenUserLocation.svelte';

	/**
	 * @type {string}
	 */
	export let selectedEnvId;
	/**
	 * @type {any}
	 */
	export let selectedCardId;
	/**
	 * @type {any}
	 */
	export let extended;
	/**
	 * @type {{ uid: string; avatar: any; }}
	 */
	export let user;

	// $: console.log('id environment', $page);

	/**
	 * @type {any[] }
	 */
	let collectedCards = [];

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
					const activitySub = docSub.data();
					console.log('docSub', activitySub);

					return docSub.exists() ? { ...d, activitySub } : null;
				})
		);
		const tmpCards = tmp.filter((d) => d);
		console.log('tmpCards', tmpCards);

		const topixSnap = await getDocs(collection(db, 'card-envs', selectedEnvId, 'topics'));
		const topix = topixSnap.docs.map((doc) => doc.data());
		const allCards = sn.docs
			.map((d) => d.data())
			.map((c) => ({
				...c,
				topics: topix.filter((t) => c.topics?.includes(t.id))
			}));

		console.log('user', user);
		collectedCards = tmpCards
			.map((c) => ({
				...c,
				topics: topix.filter((t) => c.topics?.includes(t.id))
			}))
			.filter((d) => d.activitySub.succeeded);

		return [topix, allCards];
		// return [cs, []];
	};
	$: promise = selectedEnvId ? loadData() : null;
</script>

<div class="flex-grow flex flex-col m-2  mx-auto p-3 w-full sm:w-diary">
	<h1 class="text-2xl mb-2">{user.email}</h1>
	<div class="relative mb-3 pointer-events-none" style="height:300px">
		<ListenUserLocation>
			<Map recenter={false} />
		</ListenUserLocation>
	</div>
	<TinyEnvSelect {selectedEnvId} />
	<div class="flex-grow flex flex-col">
		{#if promise !== null}
			{#await promise}
				<TickleWobble />
			{:then [topics, allCards]}
				<CollectedCards
					{allCards}
					{collectedCards}
					{topics}
					{selectedEnvId}
					{selectedCardId}
					{extended}
					onCardSubmit={(c) => {
						if (c.activitySub.succeeded) {
							collectedCards = [...collectedCards, c];
						} else {
							collectedCards = collectedCards.filter((d) => d.id !== c.id);
						}
					}}
				/>
			{/await}
		{:else}
			<div class="text-2xl m-auto">Please select an Environment</div>
		{/if}
	</div>
</div>
