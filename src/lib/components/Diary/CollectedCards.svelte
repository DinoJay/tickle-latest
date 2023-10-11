<script>
	import CollectedCards from './../home/cards/CollectedCards.svelte';
	import SelectColor from './../Admin/Topics/SelectColor.svelte';
	import Card from '../Card/Card.svelte';
	import uniqBy from 'lodash.uniqBy';
	import group from '$lib/group';

	import CardsByTopic from './CardsByTopic.svelte';
	import { goto } from '$app/navigation';

	/**
	 * @type {any[]}
	 */
	export let collectedCards;

	/**
	 * @type {string}
	 */
	export let selectedEnvId;
	/**
	 * @type {null |string}
	 */
	export let selectedCardId;
	export let extended;
	/**
	 * @type {any[]}
	 */
	export let allCards;

	/**
	 * @type {(arg0: any) => any}
	 */
	export let onCardSubmit;

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
		allNum: groupedAllCards.get(d.title).length
	}));

	$: allTags = uniqBy(
		allCards.flatMap((c) => c.topics),
		(d) => d.title
	).map((t) => ({
		...t,
		openCards: groupedAllCards
			.get(t.title)
			.filter((/** @type {{ id: any; }} */ c1) => !collectedCards.find((c2) => c1.id === c2.id))
	}));
</script>

<div class="flex flex-wrap gap-1 mt-2">
	{#each collectedTags as t}
		<div class="text-white px-1" style="background:{t.color}">
			{t.title}
			{t.collectedNum} / {t.allNum}
		</div>
	{/each}
</div>
<div class="mt-2">
	<CardsByTopic {selectedEnvId} {collectedCards} {allTags} />
</div>
{#if !!selectedCardId}
	{#key selectedCardId}
		<Card
			open={!!selectedCardId}
			{selectedEnvId}
			onClose={() => goto(`/diary/${selectedEnvId}`)}
			onActivitySubmit={(activitySub) => onCardSubmit({ ...curCard, activitySub })}
			{...curCard}
		/>
	{/key}
{/if}
