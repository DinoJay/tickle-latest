<script>
	import Slider from '$lib/components/CardView/Slider/index.svelte';
	import TopicMap from '$lib/components/CardView/TopicMap/index.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import Upset from './Upset/index.svelte';
	import Card from '../Card/Card.svelte';
	import { goto } from '$app/navigation';
	import SwitchVisBtn from './SwitchVisBtn.svelte';
	import { GEOMAP, TOPICMAP, UPSET, SWIPECARDS, VISTYPES } from '$lib/constants/visTypes';
	import { titleLocale } from '/src/stores/localizationStore';
	import Swipeable from './SwipableCards/Swipeable.svelte';
	import CardLightBox from '../Card/CardLightBox.svelte';
	import Modal from '../utils/Modal.svelte';
	import Radial from './Pathfinder/index.svelte';

	export let selectedEnvId = 'undefined';
	/**
	 * @type {{ langs: string[]; userViews: string[]; }}
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

	let centerLocation = '';

	$: curCard = cards?.find((card) => card.id === selectedCardId);
	$: if (cards) centerLocation = cards.find((card) => card.id === selectedCardId)?.loc;

	let selVisType = selectedEnv.userViews ? selectedEnv.userViews[0] : GEOMAP;
	let oldSelVisType = selVisType;

	const onCardClick = (id) => {
		if (selectedCardId !== id) goto(`/cardview/environment/${selectedEnvId}/${id}`);
		else goto(`/cardview/environment/${selectedEnvId}/${id}/extended`);
	};

	$: console.log({ selectedEnv, selVisType });
</script>

<div class="flex-grow flex flex-col w-full relative overflow-y-auto">
	{#if cards?.length > 0}
		{#if [TOPICMAP, GEOMAP, 'x'].includes(selVisType)}
			<Slider {cards} selectedEnvironment={selectedEnvId} {selectedCardId} onClick={onCardClick} />
		{/if}
		<div
			class="absolute h-full w-full {[GEOMAP, SWIPECARDS].includes(selVisType)
				? 'visible'
				: 'invisible'}"
		>
			<Map {cards} {centerLocation} onClick={onCardClick} />
		</div>

		{#if selVisType === UPSET}
			<Upset {cards} {topics} {selectedCardId} {onCardClick} onTopicClick={(id) => null} />
		{/if}

		{#if selVisType === TOPICMAP}
			<TopicMap
				visible={selVisType === TOPICMAP}
				{cards}
				topics={topics.map((d) => ({ ...d, title: d[$titleLocale] || d.title }))}
				selectedCardId={curCard?.id}
				selectedEnvironment={selectedEnvId}
				onClick={onCardClick}
			/>
		{/if}
		<Modal isOpen={selVisType === SWIPECARDS}>
			<Swipeable
				{cards}
				{selVisType}
				{selectedEnv}
				onUserViewChange={(t) => (selVisType = t)}
				onClose={() => {
					//TODO: wrong fix that
					selVisType = oldSelVisType;
				}}
			/>
		</Modal>

		<!-- {#if selVisType === 'x'}
			<Radial {cards} selectedCardId={selectedCardId || cards[0]?.id} />
		{/if} -->

		<SwitchVisBtn
			cls="absolute bottom-8 right-5"
			selected={selVisType}
			all={selectedEnv.userViews || VISTYPES}
			onClick={(t) => {
				oldSelVisType = selVisType;
				selVisType = t;
			}}
		/>
	{:else}
		<div class="m-auto text-2xl">No content in this Environment!</div>
	{/if}
</div>
{#if !!selectedCardId && !!extended}
	{#key selectedCardId}
		<CardLightBox
			open={!!selectedCardId}
			langs={selectedEnv.langs}
			{selectedEnvId}
			onClose={() => {
				//TODO: wrong fix that
				selectedCardId = null;
			}}
			{...curCard}
		/>
	{/key}
{/if}
