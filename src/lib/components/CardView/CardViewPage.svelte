<script>
	import { store } from '/src/stores/index';
	import Slider from '$lib/components/CardView/Slider/index.svelte';
	import TopicMap from '$lib/components/CardView/TopicMap/index.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import MapButton from './MapButton.svelte';
	import SelectEnv from '$lib/components/SelectEnv/index.svelte';
	import Card from '../Card/Card.svelte';
	import { goto } from '$app/navigation';

	export let selectedEnvId = 'undefined';
	export let cards;
	export let topics;
	export let extended;

	export let selectedCardId = null;
	let map = false;
	let centerLocation = '';

	$: curCard = cards?.find((card) => card.id === selectedCardId);
	$: if (cards) centerLocation = cards.find((card) => card.id === selectedCardId)?.loc;

	$: console.log(' selectedCardId', selectedCardId, 'extended', extended);
</script>

<div class="flex-grow flex flex-col w-full relative">
	{#if cards?.length > 0}
		<Slider
			{cards}
			selectedEnvironment={selectedEnvId}
			{selectedCardId}
			onClick={(id) => {
				if (selectedCardId !== id) goto(`/cardview/environment/${selectedEnvId}/${id}`);
				else goto(`/cardview/environment/${selectedEnvId}/${id}/extended`);
				// if (selectedCardId === id && !extended) {
				// 	goto(`/cardview/environment/${selectedEnvId}/${id}`);
				// 	return;
				// }
				// if (selectedCardId === id && extended)
				// 	goto(`/cardview/environment/${selectedEnvId}/${id}/extended`);
			}}
		/>

		<div class={!map ? 'visible' : 'invisible'}>
			<TopicMap
				w={800}
				h={500}
				{cards}
				{topics}
				selectedCardId={curCard?.id}
				selectedEnvironment={selectedEnvId}
				onClick={(id) => (selectedCardId = id)}
			/>
		</div>

		<div class="absolute h-full w-full  {map ? 'visible' : 'invisible'}">
			<Map {cards} {centerLocation} onClick={(id) => (selectedCardId = id)} />
		</div>

		<MapButton {map} onClick={() => (map = !map)} />
	{/if}
</div>
{#if !!selectedCardId && !!extended}
	{#key selectedCardId}
		<Card
			open={!!selectedCardId}
			{selectedEnvId}
			onClose={() => (selectedCardId = null)}
			onActivitySubmit={(sub) => {}}
			{...curCard}
		/>
	{/key}
{/if}
