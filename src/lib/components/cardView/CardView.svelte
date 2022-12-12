<script>
	import { store } from '/src/stores/index';
	import Slider from '$lib/components/cardView/utils/slider/Slider.svelte';
	import TopicMap from '$lib/components/cardView/utils/topicMap/TopicMap.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import MapButton from '$lib/components/cardView/utils/MapButton.svelte';
	import SelectEnvironment from '$lib/components/environment/EnvironmentSelector.svelte';
	import Card from '../Card/Card.svelte';

	export let selectedEnvironment = 'undefined';

	let cards = undefined;
	let selectedCardId = null;
	let map = false;
	let centerLocation = '';

	$: curCard = cards?.find((card) => card.id === selectedCardId);
	$: if ($store.envs) cards = $store.envs?.find((env) => env.id === selectedEnvironment)?.cards;
	$: if (cards) centerLocation = cards.find((card) => card.id === selectedCardId)?.loc;

	$: console.log('curCard', curCard);
</script>

<div class="flex-grow flex flex-col w-full relative">
	{#if cards?.length > 0}
		<Slider
			{cards}
			{selectedEnvironment}
			{selectedCardId}
			onClick={(id) => (selectedCardId = id)}
		/>

		<div class={!map ? 'visible' : 'invisible'}>
			<TopicMap
				w={800}
				h={500}
				{cards}
				selectedCard={curCard}
				{selectedEnvironment}
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
		selectedEnvId={selectedEnvironment}
		onClose={() => (selectedCardId = null)}
		onActivitySubmit={(sub) => {}}
		{...curCard}
	/>
{/key}
{#if selectedEnvironment === 'undefined'}
	<SelectEnvironment {selectedEnvironment} isOpen={true} isMandatory={true} />
{/if}
