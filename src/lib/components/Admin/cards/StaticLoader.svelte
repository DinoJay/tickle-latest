<script>
	// @ts-nocheck

	import PreviewCard from '$lib/components/PreviewCard.svelte';
	import * as d3 from 'd3';
	import { v4 as uuidv4 } from 'uuid';
	import LightBox from '$lib/components/utils/LightBox.svelte';

	import { collection, doc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	// import xmlJs from 'xml-js';

	import NewCard from '$lib/components/Admin/cards/NewCard.svelte';
	import xml2json from './xml2json';
	import Card from '$lib/components/Card/Card.svelte';
	import PaginatedCardList from './PaginatedCardList.svelte';
	import CardListByName from './CardListByName.svelte';

	// console.log('d3 xml', xml);
	let cardData = [];
	/**
	 * @type {{ id: string; title: any; description: string; img: { name: string; url: string; }; activity: null; topics: never[]; loc: { longitude: number; latitude: number; }; } | null}
	 */
	let currentCard = undefined;
	let selectedEnvironment = 'toxipedia';
	export let selectedEnvId;
	export let onCreate;

	// onMount(() => {});

	const loadFile = () =>
		d3.xml('./opentoxipedia2018_modified.xml').then((xml) => {
			const rawdata = xml2json(xml).mediawiki.page;

			cardData = rawdata
				.filter((d) => d.title && d.definition && d.reference)
				.map((d) => {
					const e = {
						id: d.title['#text'], //uuidv4(),
						title: d.title['#text'],
						description: d.definition['#text'],
						links: d.reference['#text'] || [],
						img: { name: '', url: '' },
						activity: null,
						topics: [],
						loc: { longitude: 4.39, latitude: 50.82 }
					};
					return e;
				});
			// console.log('xml', data);
		});

	const createCards = () => {
		onCreate(ncs);
	};
	let selView = 'name';
</script>

<LightBox isOpen={!!currentCard} close={() => (currentCard = undefined)}>
	<NewCard
		{selectedEnvId}
		{currentCard}
		onCreate={(c) => {
			onCreate(c);
			currentCard = undefined;
		}}
	/>
</LightBox>

{#if cardData.length === 0}
	<div class="flex-grow w-full flex">
		<div class="m-auto">
			<input class="border-2 p-1" disabled bind:value={selectedEnvironment} />
			<button class="border-2  p-1 " on:click={loadFile}>Load File</button>
		</div>
	</div>
{/if}
{#if selView === 'page'}
	<PaginatedCardList
		cards={cardData}
		onClick={(c) => {
			currentCard = c;
		}}
	/>
{/if}
{#if selView === 'name'}
	<CardListByName
		cards={cardData}
		onClick={(c) => {
			currentCard = c;
		}}
	/>
{/if}
