<script>
	import PreviewCard from '../PreviewCard.svelte';
	import Card from '../Card/Card.svelte';

	import { goto } from '$app/navigation';

	export let cards;

	export let selectedEnvId;
	export let selectedCardId;
	export let extended;

	$: console.log('props', $$props);

	$: curCard = cards?.find((card) => card.id === selectedCardId);
</script>

<div class="mt-3 flex flex-wrap gap-2 mx-auto">
	{#each cards as c}
		<PreviewCard {...c} onClick={() => goto(`/diary/${selectedEnvId}/${c.id}`)} />
	{/each}
</div>
{#if !!selectedCardId}
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
