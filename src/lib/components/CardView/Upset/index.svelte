<script>
	import { afterUpdate } from 'svelte';
	import MiniCard from './MiniCard.svelte';
	import { groups } from '$lib/group';
	import hexToRgba from '$lib/components/utils/hexToRgba';
	export let cards;
	export let onCardClick;
	export let selectedCardId;
	export let topics;
	let selectedRow = null;

	const margin = '40px';
	const labelHeight = '8rem';
	const itemWidth = 'w-6';
	const itemHeight = 'h-6';
	const barHeightCls = 'h-3';
	const contPad = 'p-2';

	const elems = cards.map(() => null);

	afterUpdate(() => {
		setTimeout(() => {
			const i = cards.findIndex((card) => card.id === selectedCardId);

			elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
		}, 100);
	});

	$: selectedCard = cards.find((c) => c.id === selectedCardId);

	$: console.log('topics', topics);

	const tagGroups = groups(
		cards.flatMap((d) => d.topicIds.map((id) => ({ ...d, topicId: id }))),
		(d) => d.topicId
	).map(([id, values]) => ({
		id,
		values
	}));

	const sumTopics = tagGroups.reduce(
		(acc, d) => (acc > d.values.length ? acc : d.values.length),
		0
	);
	console.log('sumtopics', sumTopics);

	console.log('tagGroups', tagGroups);
</script>

<div class="flex-grow flex  flex-col m-auto overflow-auto {contPad}">
	<div class="flex items-center  ml-20 sm:ml-28 m-auto mb-3 ">
		{#each topics as topic, i}
			{@const beforeLast = i < topics.length - 1}
			<div
				class=" relative {beforeLast ? itemWidth : ''} "
				style:height={labelHeight}
				style:margin-right={beforeLast ? margin : null}
			>
				<div
					class="pt-2 relative"
					style:height={labelHeight}
					style:writing-mode="vertical-rl"
					style:text-orientation="mixed"
					style:transform-origin="left bottom"
					style:transform="rotate(-20deg)"
					style:isolation="isolate"
				>
					<div
						class="absolute left-0 bottom-0 w-full "
						style:z-index="-1"
						style:background={topic.color}
						class:opacity-50={true}
						style:height={(tagGroups.find((d) => d.id === topic.id).values.length / sumTopics) *
							100 +
							'%'}
					/>
					<div class="z-10 crop">
						{topic.title}
					</div>
				</div>
				<!-- <div class="absolute w-6 h-6 border inset-0" style:background={t.color} /> -->
			</div>
		{/each}
	</div>
	<div class="flex-grow flex flex-col overflow-y-auto {contPad} ">
		{#each cards as c, j}
			{@const lastIndex = topics?.findLastIndex((t) => c.topicIds.includes(t.id))}
			{@const firstIndex = topics?.findIndex((t) => c.topicIds.includes(t.id))}
			<div
				bind:this={elems[j]}
				on:click={() => {
					onCardClick(c.id);
				}}
				on:keydown={() => {
					onCardClick(c.id);
				}}
				class="flex items-center mb-2 cursor-pointer relative bg-gray-100 p-1"
			>
				<!-- <div class="w-32">{c.title}</div> -->

				<MiniCard {...c} cls="w-16 h-20 sm:h-28 sm:w-24 mr-3" />
				{#each topics as t, i}
					{@const topic = c.topics?.find((t2) => t2.id === t.id)}
					{@const off = false}
					<div class="relative">
						<!-- <div class="absolute left-0 top-0 h-20 w-6 bg-red-500" /> -->
						<div
							class:opacity-50={false}
							class=" item-m-top item-m-bottom {itemHeight} {itemWidth} {topic !== undefined
								? 'border-2 border-gray-700'
								: 'bg-white'}"
							style:background={topic !== undefined ? hexToRgba(topic.color, 0.5) : 'white'}
						/>
						{#if topic === undefined && i > firstIndex && i <= lastIndex && i < topics.length - 1}
							<div
								class="{itemWidth} {barHeightCls} item-m-top bg-gray-700 absolute left-0 top-0"
								class:opacity-50={off}
								style:transform="translateY(50%)"
							/>
						{/if}
					</div>
					{#if i < lastIndex && i >= firstIndex}
						<div
							class:opacity-50={off}
							class="{barHeightCls} bg-gray-700 link-offset"
							style:width={margin}
							style:transform="translateY(-50%)"
						/>
					{:else}
						<div
							class=""
							class:opacity-50={off}
							style:width={i < topics.length - 1 ? margin : null}
							style:transform="translateY(-50%)"
						/>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.item-m-top {
		margin-top: 0.375rem;
	}

	.item-m-bottom {
		margin-bottom: 0.375rem;
	}

	.link-offset {
		margin-top: 0.75rem;
	}
</style>
