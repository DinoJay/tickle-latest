<script>
	import { collection, doc, getDocs } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import CardsPage from './CardsPage.svelte';

	export let selectedEnvId;
	export let onChange;
	export let cards;

	let loading = false;
	// let currentCard = {
	// 	id: 'null',
	// 	title: '',
	// 	description: '',
	// 	img: { name: '', url: '' },
	// 	activity: null,
	// 	topics: [],
	// 	loc: { longitude: 4.39, latitude: 50.82 }
	// };

	$: console.log('loading', loading);
	let lbStaticLoader = false;
</script>

{#if cards === undefined}
	<div>Loading...</div>
{:else}
	<CardsPage {cards} {selectedEnvId} onChange={(cs) => onChange(cs)} />
{/if}
