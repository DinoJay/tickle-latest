<script>
	import { afterUpdate } from 'svelte';
	import MiniCard from './MiniCard.svelte';
	import { groups } from '$lib/group';
	import hexToRgba from '$lib/components/utils/hexToRgba';
	import { flip } from 'svelte/animate';
	import { fly, fade } from 'svelte/transition';

	export let cards;
	export let onCardClick;
	export let selectedCardId;
	export let topics;
	export let onSelectTopicId;
	export let selectedTopicId;

	const labelHeight = '8rem';
	const itemWidth = 'w-6';
	const itemHeight = 'h-6';
	const barHeightCls = 'h-3';
	const contPad = 'p-2';

	const elems = cards.map(() => null);

	afterUpdate(() => {
		setTimeout(() => {
			// console.log('selectedCardId', selectedCardId);
			const i = cards.findIndex((card) => card.id === selectedCardId);
			// console.log('scroll', elems);
			// console.log('i', i);

			elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
		}, 100);
	});

	// $: selectedCard = cards.find((c) => c.id === selectedCardId);

	// $: console.log('topics', topics);

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
	// console.log('sumtopics', sumTopics);

	// console.log('onselecttopicId', onSelectTopicId);
	$: onTopicClick = (topic) => {
		onSelectTopicId(selectedTopicId === topic.id ? null : topic.id);
	};

	const legendBarWidth = 'w-8';
</script>

<div class="flex-grow flex  flex-col m-auto overflow-auto {contPad}">
	<div class="flex items-center  ml-20 sm:ml-28 m-auto mb-3 ">
		{#each topics as topic, i}
			{@const beforeLast = i < topics.length - 1}
			{@const highlighted = selectedTopicId === topic.id || selectedTopicId === null}
			<div
				on:click={() => onTopicClick(topic)}
				on:keydown={() => onTopicClick(topic)}
				class="relative cursor-pointer {beforeLast ? itemWidth : ''} "
				style:height={labelHeight}
				class:marginRight={beforeLast}
			>
				<div
					class="pt-2 relative "
					style:height={labelHeight}
					style:writing-mode="vertical-rl"
					style:text-orientation="mixed"
					style:transform-origin="left bottom"
					style:transform="rotate(-20deg)"
					style:isolation="isolate"
				>
					<div
						class="absolute left-0 bottom-0 {legendBarWidth}"
						style:z-index="-1"
						style:background={hexToRgba(
							topic.color,
							selectedTopicId === null ? 0.5 : topic.id === selectedTopicId ? 0.8 : 0.2
						)}
						style:height={(tagGroups.find((d) => d.id === topic.id).values.length / sumTopics) *
							100 +
							'%'}
					/>
					<div class="absolute left-0 top-0 h-full z-10 crop pt-2 {legendBarWidth}">
						<div class="w-full h-full flex items-center"><div class="crop">{topic.title}</div></div>
					</div>
					<div class="absolute border-2 left-0 top-0 h-full z-10 crop {legendBarWidth}" />
				</div>
				<!-- <div class="absolute w-6 h-6 border inset-0" style:background={t.color} /> -->
			</div>
		{/each}
	</div>
	<div class="flex-grow flex flex-col overflow-y-auto {contPad} ">
		{#each cards as c, j (c.id)}
			{@const lastIndex = topics?.findLastIndex((t) => c.topicIds.includes(t.id))}
			{@const firstIndex = topics?.findIndex((t) => c.topicIds.includes(t.id))}
			<div
				animate:flip={{ duration: 700 }}
				transition:fly
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

				{#key c.id}
					<MiniCard
						{...c}
						cls="w-16 h-20 sm:h-28 sm:w-24 mr-3"
						highlighted={c.id === selectedCardId}
					/>
				{/key}
				{#each topics as t, i (t.id + '' + c.id)}
					{@const topic = c.topics?.find((t2) => t2.id === t.id)}
					{@const tagOn = topic != undefined && selectedCardId === c.id}
					{@const barOn = selectedCardId === c.id && i >= firstIndex && i <= lastIndex}
					<div class="relative">
						<!-- <div class="absolute left-0 top-0 h-20 w-6 bg-red-500" /> -->
						<div
							class=" rounded-full item-m-top item-m-bottom {itemHeight} {itemWidth} {topic !==
							undefined
								? 'border-2 border-gray-700 '
								: 'bg-white'}"
							style:background={topic !== undefined
								? hexToRgba(topic.color, tagOn ? 1 : 0.5)
								: 'white'}
							style:transform={topic !== undefined ? 'scale(1.2)' : ''}
						/>
						{#if topic === undefined && i > firstIndex && i <= lastIndex && i < topics.length - 1}
							<div
								class="{itemWidth} {barHeightCls} {barOn
									? 'opacity-100'
									: 'opacity-50'} item-m-top bg-gray-700 absolute left-0 top-0"
								style:transform="translateY(50%)"
							/>
						{/if}
					</div>
					{#if i < lastIndex && i >= firstIndex}
						<div
							class="{barHeightCls} barWidth bg-gray-700 
							link-offset {barOn ? 'opacity-100' : 'opacity-50'}"
							style:transform="translateY(-50%)"
						/>
					{:else}
						<div
							class={barOn ? 'opacity-100' : 'opacity-50'}
							class:barWidth={i < topics.length - 1}
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

	.marginRight {
		margin-right: 25px;
	}
	.barWidth {
		width: 25px;
	}
	@media only screen and (min-width: 600px) {
		.marginRight {
			margin-right: 50px;
		}
		.barWidth {
			width: 50px;
		}
		/* … */
	}
</style>
