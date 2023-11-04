<script>
	import EditCard from '$lib/components/Admin/cards/EditCard.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import PreviewCard from '$lib/components/PreviewCard.svelte';
	import { store } from '/src/stores/index';
	import { deleteDoc, doc, setDoc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	import NewCard from './NewCard.svelte';
	import StaticLoader from './StaticLoader.svelte';
	import EditCardBack from './EditCardBack.svelte';
	import Spinner from '$lib/components/utils/Spinner.svelte';
	import { titleLocales, LANGS, EN } from '$lib/constants/locales.js';
	import Modal from '$lib/components/utils/Modal.svelte';

	/**
	 * @type {any[]}
	 */
	export let cards;
	/**
	 * @type {string}
	 */
	export let selectedEnvId;
	/**
	 * @type {(arg0: any[]) => void}
	 */
	export let onChange;

	/**
	 * @type {string[]}
	 */

	export let langs = LANGS;

	/**
	 * @type {string}
	 */
	export let selLang;

	/**
	 * @type {string | null}
	 */
	let selectedCardId = null;
	let lbNcOpen = false;
	let slOpen = false;
	let flipped = false;

	$: selectedCard = cards?.find((c) => c.id === selectedCardId) || {};

	$: titleKey = titleLocales[selLang];

	$: console.log('titlekey', titleKey);
</script>

<div class="flex flex-wrap gap-2 p-1 flex-grow overflow-y-auto justify-items-center">
	{#if !!cards}
		{#if cards.length === 0}
			<div class="text-center w-full m-12 text-xl">No Cards</div>
		{/if}
		{#each cards as c}
			<PreviewCard
				{...c}
				title={c[titleKey] || 'no-title'}
				highlighted={selectedCardId === c.id}
				onClick={() => (selectedCardId = c.id)}
			/>
		{/each}
	{:else}
		<Spinner cls="mx-auto my-12" />
	{/if}
</div>

<div class=" w-full mt-3 flex-shrink-0 flex-grow flex">
	<button class="flex-grow create-btn mr-2" on:click={() => (lbNcOpen = true)}>Create Card</button>
	<button class="flex-grow create-btn" on:click={() => (slOpen = true)}>Load Cards</button>
</div>

<Modal isOpen={!!selectedCardId}>
	<EditCard
		currentCard={selectedCard}
		{langs}
		{selLang}
		{selectedEnvId}
		onClose={() => {
			selectedCardId = null;
		}}
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
</Modal>
<Modal isOpen={!!lbNcOpen} close={() => (lbNcOpen = false)}>
	<NewCard
		{selectedEnvId}
		{langs}
		{selLang}
		onClose={() => {
			lbNcOpen = false;
		}}
		onCreate={(c) => {
			lbNcOpen = false;
			const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', c.id);
			setDoc(docRef, c);
			onChange([c, ...cards]);
		}}
	/>
</Modal>

<LightBox cls="overflow-y-auto" title="Load Cards" isOpen={slOpen} close={() => (slOpen = false)}
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
