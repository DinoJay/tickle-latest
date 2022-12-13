<script>
	import { store } from '/src/stores/index';
	import Slider from '$lib/components/CardView/Slider/index.svelte';
	import TopicMap from '$lib/components/CardView/TopicMap/index.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import MapButton from './MapButton.svelte';
	import SelectEnv from '$lib/components/SelectEnv/index.svelte';
	import Card from '../Card/Card.svelte';

	export let selectedEnvId = 'undefined';
	export let cards;
	export let topics;
	export let onEnvIdChange;

	let selectedCardId = null;
	let map = false;
	let centerLocation = '';

	$: curCard = cards?.find((card) => card.id === selectedCardId);
	$: if (cards) centerLocation = cards.find((card) => card.id === selectedCardId)?.loc;
</script>

<div class="flex-grow flex flex-col w-full relative">
	{#if cards?.length > 0}
		<Slider
			{cards}
			selectedEnvironment={selectedEnvId}
			{selectedCardId}
			onClick={(id) => (selectedCardId = id)}
		/>

		<div class={!map ? 'visible' : 'invisible'}>
			<TopicMap
				w={800}
				h={500}
				{cards}
				{topics}
				selectedCard={curCard}
				selectedEnvironment={selectedEnvId}
				onClick={(id) => (selectedCard = id)}
			/>
		</div>

		<div class="absolute h-full w-full  {map ? 'visible' : 'invisible'}">
			<Map {cards} {centerLocation} onClick={(id) => (selectedCardId = id)} />
		</div>

		<MapButton {map} onClick={() => (map = !map)} />
	{/if}
</div>
{#key selectedCardId}
	<Card
		open={!!selectedCardId}
		{selectedEnvId}
		onClose={() => (selectedCardId = null)}
		onActivitySubmit={(sub) => {}}
		{...curCard}
	/>
{/key}
{#if selectedEnvId === 'undefined'}
	<SelectEnv {selectedEnvId} isOpen={true} isMandatory={true} onChange={onEnvIdChange} />
{/if}
