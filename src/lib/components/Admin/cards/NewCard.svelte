<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc } from 'firebase/firestore';
	import { v4 as uuidv4 } from 'uuid';
	import EditCard from './EditCard.svelte';
	export let selectedEnvId;
	export let onCreate;
	export let currentCard = {};

	let newCard = {
		id: 'null',
		title: '',
		description: '',
		img: { name: '', url: '' },
		activity: null,
		topics: [],
		loc: { longitude: 4.39, latitude: 50.82 },
		links: [],
		...currentCard
	};
</script>

<EditCard
	{...$$props}
	currentCard={newCard}
	{selectedEnvId}
	onChange={(c) => {
		console.log('test');
		newCard = c;
	}}
	onCreate={() => {
		newCard = {
			...newCard,
			id: uuidv4(),
			loc: { longitude: 4.39, latitude: 50.82 }
		};
		onCreate(newCard);
	}}
/>
