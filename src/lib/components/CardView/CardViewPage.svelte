<script>
	import { store } from '/src/stores/index';
	import Slider from '$lib/components/CardView/Slider/index.svelte';
	import TopicMap from '$lib/components/CardView/TopicMap/index.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import Upset from './Upset/index.svelte';
	import Card from '../Card/Card.svelte';
	import { goto } from '$app/navigation';
	import SwitchVisBtn from './SwitchVisBtn.svelte';

	export let selectedEnvId = 'undefined';
	export let cards;
	export let topics;
	export let extended;

	export let selectedCardId = null;

	const GEOMAP = 'map';
	const TOPICMAP = 'topicmap';
	const UPSET = 'upset';
	const VISTYPES = [GEOMAP, TOPICMAP, UPSET];

	let centerLocation = '';

	let width;
	let height;

	$: curCard = cards?.find((card) => card.id === selectedCardId);
	$: if (cards) centerLocation = cards.find((card) => card.id === selectedCardId)?.loc;

	const topicIds = topics.map((t) => t.id);

	let selVisTypeCounter = 0;
	$: selVisType = VISTYPES[selVisTypeCounter];
</script>

<div class="flex-grow flex flex-col w-full relative overflow-y-auto">
	{#if cards?.length > 0}
		<Slider
			{cards}
			selectedEnvironment={selectedEnvId}
			{selectedCardId}
			onClick={(id) => {
				if (selectedCardId !== id) goto(`/cardview/environment/${selectedEnvId}/${id}`);
				else goto(`/cardview/environment/${selectedEnvId}/${id}/extended`);
			}}
		/>

		<div class="absolute h-full w-full  {selVisType === GEOMAP ? 'visible' : 'invisible'}">
			<Map {cards} {centerLocation} onClick={(id) => (selectedCardId = id)} />
		</div>

		<!-- <ForceGraph {cards} {width} {height} /> -->
		{#if selVisType === UPSET}
			<Upset {cards} {topics} />
		{/if}

		{#if selVisType === TOPICMAP}
			<TopicMap
				visible={selVisType === TOPICMAP}
				{cards}
				{topics}
				selectedCardId={curCard?.id}
				selectedEnvironment={selectedEnvId}
				onClick={(id) => (selectedCardId = id)}
			/>
		{/if}

		<SwitchVisBtn
			selected={selVisType}
			all={VISTYPES}
			onClick={() => (selVisTypeCounter = (selVisTypeCounter + 1) % VISTYPES.length)}
		/>
	{:else}
		<div class="m-auto text-2xl">No content in this Environment!</div>
	{/if}
</div>
{#if !!selectedCardId && !!extended}
	{#key selectedCardId}
		<Card
			open={!!selectedCardId}
			{selectedEnvId}
			onClose={() => {
				//TODO: wrong fix that

				selectedCardId = null;
			}}
			onActivitySubmit={(sub) => {}}
			{...curCard}
		/>
	{/key}
{/if}
