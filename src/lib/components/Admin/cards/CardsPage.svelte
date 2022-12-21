<script>
	import EditCard from '$lib/components/Admin/cards/EditCard.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import PreviewCard from '$lib/components/PreviewCard.svelte';
	import { OAuthCredential } from 'firebase/auth';
	import { deleteDoc, doc, setDoc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import { v4 as uuidv4 } from 'uuid';
	import NewCard from './NewCard.svelte';
	import StaticLoader from './StaticLoader.svelte';
	export let cards = [];
	export let selectedEnvId;
	export let onChange;

	let selectedCardId = null;
	let lbNcOpen = false;
	let slOpen = false;

	$: selectedCard = cards.find((c) => c.id === selectedCardId) || {};
	$: console.log('selectedCard', selectedCard);
</script>

<div class="flex flex-wrap gap-2  flex-shrink-1 flex-grow overflow-y-auto">
	{#each cards as c}
		<PreviewCard {...c} onClick={() => (selectedCardId = c.id)} />
	{/each}
</div>

<div class=" w-full mt-3 flex-shrink-0 flex-grow flex">
	<button class="flex-grow create-btn mr-2" on:click={() => (lbNcOpen = true)}>Create Card</button>
	<button class="flex-grow create-btn " on:click={() => (slOpen = true)}>Load Cards</button>
</div>

<LightBox
	isOpen={!!selectedCardId}
	title={selectedCard?.title}
	close={() => (selectedCardId = null)}
	cls="overflow-y-auto flex-grow"
>
	<EditCard
		currentCard={selectedCard}
		{selectedEnvId}
		onRemove={(d) => {
			console.log('d', d);
			const newCards = cards.filter((oc) => oc.id !== d.id);
			onChange(newCards);
			const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', selectedCardId);
			deleteDoc(docRef);
			selectedCardId = null;
		}}
		onChange={(c) => {
			const newCards = cards.map((oc) => {
				if (c.id === oc.id) return c;
				return oc;
			});

			const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', selectedCardId);
			setDoc(docRef, c);
			onChange(newCards);
		}}
	/>
</LightBox>
<LightBox isOpen={!!lbNcOpen} title={'New Card'} close={() => (lbNcOpen = false)}>
	<NewCard
		{selectedEnvId}
		onCreate={(c) => {
			lbNcOpen = false;
			const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', c.id);
			setDoc(docRef, c);
			onChange([c, ...cards]);
		}}
	/>
</LightBox>

<LightBox title="Load Cards" isOpen={slOpen} close={() => (slOpen = false)}
	><StaticLoader
		{selectedEnvId}
		onCreate={(c) => {
			lbNcOpen = false;
			const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', c.id);
			setDoc(docRef, c);
			onChange([c, ...cards]);
		}}
	/></LightBox
>
