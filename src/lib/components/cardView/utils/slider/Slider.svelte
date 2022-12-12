<script>
	import { afterUpdate } from 'svelte';
	import PreviewCard from '$lib/components/PreviewCard.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import ActivityCard from '$lib/components/Admin/cards/edit/activity/ActivityCard.svelte';
	import { curveCardinal } from 'd3';

	export let cards = [{}];
	export let selectedEnvironment = '';
	export let selectedCard = '';
	export let onClick = () => {};
	export let selectedCardId;

	$: previewCardData = cards.map((card) => ({
		id: card.id,
		title: card.title,
		img: card.img,
		alt: card.img?.name
	}));

	const getCardProps = (card) => ({
		title: card.title,
		img: card.img?.url,
		description: card.description,
		links: card.links || [],
		activity: card?.activity,
		id: card?.id,
		envId: selectedEnvironment
	});
	const elems = cards.map(() => null);
	let openModal = false;

	afterUpdate(() => {
		const i = cards.findIndex((card) => card.id === selectedCardId);

		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
	});
</script>

<div class="flex h-auto px-3 py-8 z-10 overflow-x-auto">
	{#each previewCardData as card, i}
		<div
			class="mx-1.5 cursor-pointer
				shrink-0 grow-0 transition"
			style="transform:scale({card.id === selectedCardId ? '1.10' : '1'})"
			bind:this={elems[i]}
			on:click={() => {
				if (selectedCardId === card.id) openModal = true;
				onClick(card.id);
			}}
		>
			<PreviewCard {...card} />
		</div>
	{/each}
</div>
