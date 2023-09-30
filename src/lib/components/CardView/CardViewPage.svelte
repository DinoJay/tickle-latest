<script>
	import Slider from '$lib/components/CardView/Slider/index.svelte';
	import TopicMap from '$lib/components/CardView/TopicMap/index.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import Upset from './Upset/index.svelte';
	import Card from '../Card/Card.svelte';
	import { goto } from '$app/navigation';
	import SwitchVisBtn from './SwitchVisBtn.svelte';

	export let selectedEnvId = 'undefined';
	/**
	 * @type {{ langs: string[]; }}
	 */
	export let selectedEnv;
	/**
	 * @type {object[]}
	 */
	export let cards;
	/**
	 * @type {object[]}
	 */
	export let topics;
	/**
	 * @type {boolean}
	 */
	export let extended;

	/**
	 * @type {string|null}
	 */
	export let selectedCardId = null;

	const GEOMAP = 'map';
	const TOPICMAP = 'topicmap';
	const UPSET = 'upset';
	const VISTYPES = [GEOMAP, TOPICMAP, UPSET];

	let centerLocation = '';

	$: curCard = cards?.find((card) => card.id === selectedCardId);
	$: if (cards) centerLocation = cards.find((card) => card.id === selectedCardId)?.loc;

	const topicIds = topics.map((t) => t.id);

	let selVisType = GEOMAP;

	const onCardClick = (id) => {
		if (selectedCardId !== id) goto(`/cardview/environment/${selectedEnvId}/${id}`);
		else goto(`/cardview/environment/${selectedEnvId}/${id}/extended`);
	};
</script>

<div class="flex-grow flex flex-col w-full relative overflow-y-auto">
	{#if cards?.length > 0}
		{#if [TOPICMAP, GEOMAP].includes(selVisType)}
			<Slider {cards} selectedEnvironment={selectedEnvId} {selectedCardId} onClick={onCardClick} />
		{/if}
		<div class="absolute h-full w-full {selVisType === GEOMAP ? 'visible' : 'invisible'}">
			<Map {cards} {centerLocation} onClick={onCardClick} />
		</div>

		{#if selVisType === UPSET}
			<Upset {cards} {topics} {selectedCardId} {onCardClick} onTopicClick={(id) => null} />
		{/if}

		{#if selVisType === TOPICMAP}
			<TopicMap
				visible={selVisType === TOPICMAP}
				{cards}
				{topics}
				selectedCardId={curCard?.id}
				selectedEnvironment={selectedEnvId}
				onClick={onCardClick}
			/>
		{/if}

		<SwitchVisBtn selected={selVisType} all={VISTYPES} onClick={(t) => (selVisType = t)} />
	{:else}
		<div class="m-auto text-2xl">No content in this Environment!</div>
	{/if}
</div>
{#if !!selectedCardId && !!extended}
	{#key selectedCardId}
		<Card
			open={!!selectedCardId}
			langs={selectedEnv.langs}
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
