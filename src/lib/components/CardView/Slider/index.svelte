<script>
	import { afterUpdate } from 'svelte';
	import PreviewCard from '$lib/components/PreviewCard.svelte';

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

	const elems = cards.map(() => null);
	let openModal = false;

	afterUpdate(() => {
		setTimeout(() => {
			const i = cards.findIndex((card) => card.id === selectedCardId);
			console.log('scroll', elems[i], selectedCardId);

			elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
		}, 100);
	});
	// $: {
	// 	setTimeout(() => {
	// 		const i = cards.findIndex((card) => card.id === selectedCardId);

	// 		console.log('scroll', !!elems[i]);
	// 		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
	// 	}, 400);
	// }
</script>

<div class="flex h-auto px-3 py-8 z-10 overflow-x-auto justify-center shrink-0">
	{#each previewCardData as card, i (card.id)}
		<div
			class="mx-1.5 cursor-pointer
				shrink-0 grow-0 transition"
			style="transform:scale({card.id === selectedCardId ? '1.10' : '1'})"
			bind:this={elems[i]}
			on:click={() => {
				if (selectedCardId === card.id) openModal = true;
				onClick(card.id);
			}}
			on:keydown={() => {
				if (selectedCardId === card.id) openModal = true;
				onClick(card.id);
			}}
		>
			<PreviewCard {...card} />
		</div>
	{/each}
</div>
