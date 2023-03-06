<script>
	import CollectedCards from './../home/cards/CollectedCards.svelte';
	import SelectColor from './../Admin/Topics/SelectColor.svelte';
	import Card from '../Card/Card.svelte';
	import uniqBy from 'lodash.uniqBy';
	import group from '$lib/group';

	import CardsByTopic from './CardsByTopic.svelte';

	/**
	 * @type {any[]}
	 */
	export let collectedCards;

	/**
	 * @type {number}
	 */
	export let selectedEnvId;
	/**
	 * @type {null |number}
	 */
	export let selectedCardId;
	export let extended;
	export let allCards;

	$: groupedAllCards = group(
		allCards.flatMap((c) => c.topics.map((t) => ({ ...c, topic: t }))),
		(d) => d.topic.title
	);

	$: groupedCollectedCards = group(
		collectedCards.flatMap((c) => c.topics.map((t) => ({ ...c, topic: t }))),
		(d) => d.topic.title
	);

	$: curCard = allCards?.find((card) => card.id === selectedCardId);
	$: collectedTags = uniqBy(
		collectedCards.flatMap((c) => c.topics),
		(d) => d.title
	).map((d) => ({
		...d,
		collectedNum: groupedCollectedCards.get(d.title).length,
		allNum: groupedAllCards.get(d.title).length,
		openCards: groupedAllCards.get(d.title).filter(
			(c) =>
				!groupedCollectedCards
					.get(d.title)
					.map((d) => d.id)
					.includes(c.id)
		)
	}));
	$: console.log('collectedCards', collectedCards);
	$: console.log('collectedTags', collectedTags);
</script>

<div class="flex flex-wrap gap-1 mt-2">
	{#each collectedTags as t}
		<div class="text-white px-1 " style="background:{t.color}">
			{t.title}
			{t.collectedNum} / {t.allNum}
		</div>
	{/each}
</div>
<div class="mt-2">
	<CardsByTopic {selectedEnvId} {collectedCards} {collectedTags} />
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
