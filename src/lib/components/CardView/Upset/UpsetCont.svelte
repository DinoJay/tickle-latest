<script>
	import MiniCard from './MiniCard.svelte';
	import { groups } from '$lib/group';
	import hexToRgba from '$lib/components/utils/hexToRgba';
	import { flip } from 'svelte/animate';
	import { fly, fade, blur } from 'svelte/transition';
	import Check from 'svelte-material-icons/Check.svelte';
	import { sort } from 'd3';

	export let cards;
	export let onCardClick;
	export let selectedCardId;
	/**
	 * @type {any[]}
	 */
	export let topics;
	export let onSelectTopicId;
	/**
	 * @type {null}
	 */
	export let selectedTopicId;

	const labelHeight = '8rem';
	const itemWidth = 'w-6';
	const itemHeight = 'h-6';
	const barHeightCls = 'h-2';
	const contPad = 'p-2';

	const elems = cards.map(() => null);

	const legendBarWidth = 'w-6';

	const usedTopics = topics.filter((d) => cards.find((c) => c.topicIds.includes(d.id)));
	const marginRight = usedTopics.length === 1 ? '3.5rem' : '0.8rem';
	let scrollBefore = null;

	$: {
		// if (beforeLegendStraight === legendStraight) return;
		setTimeout(() => {
			// console.log('selectedCardId', selectedCardId);
			const i = cards.findIndex((card) => card.id === selectedCardId);
			// console.log('scroll', elems);
			// console.log('i', i);

			elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
		}, 200);
	}

	let timeoutId = null;
	$: {
		// timeoutId = setTimeout(() => {
		// 	legendStraight = false;
		// }, 1000);
	}
	// $: selectedCard = cards.find((c) => c.id === selectedCardId);

	// $: console.log('topics', topics);

	const tagGroups = groups(
		cards.flatMap((d) => d.topicIds.map((id) => ({ ...d, topicId: id }))),
		(d) => d.topicId
	).map(([id, values]) => ({
		id,
		values
	}));

	console.log('taggroups', tagGroups);

	const maxTopic = tagGroups.reduce((acc, d) => (acc > d.values.length ? acc : d.values.length), 0);
	const sortedTopics = usedTopics
		.map((d) => ({
			...d,
			norm: tagGroups.find((e) => e.id === d.id).values.length / maxTopic
		}))
		.sort((a, b) => b.norm - a.norm);
	// .slice(0, 2);
	// console.log('sumtopics', sumTopics);

	// console.log('onselecttopicId', onSelectTopicId);
	$: onTopicClick = (topic) => {
		onSelectTopicId(selectedTopicId === topic.id ? null : topic.id);
	};

	let legendStraight = false;
	let lastScroll = 0;
</script>

<div class="flex-grow flex flex-col m-auto overflow-auto {contPad}">
	<div
		class="flex items-center {sortedTopics.length > 1 ? 'ml-legend' : 'ml-legend-single'} m-auto"
	>
		{#each sortedTopics as topic, i (topic.id)}
			{@const beforeLast = i < sortedTopics.length - 1}
			<div
				on:click={() => onTopicClick(topic)}
				on:keydown={() => onTopicClick(topic)}
				class="relative cursor-pointer {beforeLast ? itemWidth : ''} "
				style:height={labelHeight}
				class:marginRight={beforeLast && sortedTopics.length >= 4}
				class:marginRight-1={beforeLast && sortedTopics.length < 4}
			>
				<div
					class="pt-2 relative transition-all"
					style:height={labelHeight}
					style:writing-mode="vertical-rl"
					style:text-orientation="mixed"
					style:transform-origin="left bottom"
					style:transform="rotate({legendStraight ? '0deg' : '-30deg'})"
					style:isolation="isolate"
				>
					<div
						class="absolute left-0 bottom-0 {legendBarWidth}"
						style:z-index="-1"
						style:background={hexToRgba(
							topic.color,
							selectedTopicId === null ? 0.5 : topic.id === selectedTopicId ? 0.8 : 0.2
						)}
						style:height={topic.norm * 100 + '%'}
					/>
					<div class="absolute left-0 top-0 h-full z-10 crop pt-2 {legendBarWidth}">
						<div class="w-full h-full flex items-center"><div class="crop">{topic.title}</div></div>
					</div>
					<div
						class="absolute outline left-0 top-0 h-full z-10 crop {legendBarWidth}"
						style:outline-color={hexToRgba(topic.color, 0.5)}
					/>
				</div>
				<!-- <div
					class="absolute outline  left-0 inset-y-2 h-full z-30 crop {legendBarWidth}"
					style:height="10px"
					style:top="98%"
					style:outline-color={hexToRgba(topic.color, 0.5)}
					style:background={hexToRgba(topic.color, 0.5)}
				/> -->
				<!-- <div class="absolute w-6 h-6 border inset-0" style:background={t.color} /> -->
			</div>
		{/each}
	</div>
	<div
		class="flex-grow flex flex-col overflow-y-auto {contPad} "
		on:scroll={(e) => {
			// // console.log('scroll', e.target.scrollTop, lastScroll);
			// if (Math.abs(e.target.scrollTop - lastScroll) > 1) {
			// 	console.log('hit');
			// 	// legendStraight = true;
			// 	// } else legendStraight = false;
			// } else {
			// 	clearTimeout(timeoutId);
			// 	timeoutId = setTimeout(() => {
			// 		legendStraight = false;
			// 	}, 400);
			// }
			// legendStraight = true;
			// lastScroll = e.target.scrollTop;
		}}
	>
		{#each cards as c, j (c.id)}
			{@const lastIndex = sortedTopics?.findLastIndex((t) => c.topicIds.includes(t.id))}
			{@const firstIndex = sortedTopics?.findIndex((t) => c.topicIds.includes(t.id))}
			<div
				bind:this={elems[j]}
				transition:fly
				animate:flip={{ duration: 700 }}
				on:click={(e) => {
					onCardClick(c.id);
				}}
				on:keydown={(e) => {
					onCardClick(c.id);
				}}
				class="flex items-center cursor-pointer relative"
			>
				{#key c.id}
					<div
						class="flex flex-col w-16 h-20 z-10 sm:h-28 sm:w-24 py-1"
						style:margin-right={marginRight}
					>
						<MiniCard {...c} cls="flex-grow  my-auto " highlighted={c.id === selectedCardId} />
					</div>
				{/key}
				{#each sortedTopics as t, i (t.id + '' + c.id)}
					{@const topic = c.topics?.find((t2) => t2.id === t.id)}
					{@const tagOn = topic != undefined && selectedCardId === c.id}
					{@const barOn = selectedCardId === c.id && i >= firstIndex && i <= lastIndex}
					{@const selected = selectedCardId === c.id}
					<div class="relative h-full flex items-center justify-center">
						<!-- {#each Array(1).fill(0) as _, i} -->
						{#if i <= firstIndex}
							<div
								class="h-2 absolute"
								style:width="76.5px"
								style:margin-top="0.5rem"
								style:background={selected ? '#374251' : '#9a9fa8'}
								style:transform="translateX(-63%) translateY(-3.5px)"
							/>
						{/if}
						<div class="absolute h-full p-3 z-10" style:background={hexToRgba(t.color, 0.2)} />
						<div
							class=" rounded-full flex items-center justify-center {itemHeight} {itemWidth} {topic !==
							undefined
								? 'border-2 border-gray-700 '
								: 'bg-white'}"
							style:background={topic !== undefined
								? hexToRgba(topic.color, tagOn ? 1 : 0.5)
								: 'white'}
							style:transform={topic !== undefined ? 'scale(1.2)' : ''}
						>
							{#if topic !== undefined}
								<Check />
							{/if}
						</div>
						{#if topic === undefined && i > firstIndex && i <= lastIndex && i < topics.length - 1}
							<div
								class="{itemWidth} {barHeightCls} {barOn
									? 'opacity-100'
									: 'opacity-50'}  bg-gray-700 absolute left-0 top-0"
								style:transform="translateY(-50%)"
								style:top="50%"
							/>
						{/if}
					</div>
					{#if i < lastIndex && i >= firstIndex}
						<div
							class="{barHeightCls} bg-gray-700 {barOn ? 'opacity-100' : 'opacity-50'}"
							style:transform="translateY(-50%)"
							class:barWidth={sortedTopics.length >= 4}
							class:barWidth-1={sortedTopics.length < 4}
							style:margin-top="0.5rem"
							style:z-index={1}
						/>
					{:else}
						<div
							class={barOn ? 'opacity-100' : 'opacity-50'}
							class:barWidth={i < sortedTopics.length - 1}
							class:barWidth-1={i < sortedTopics.length - 1 && sortedTopics.length < 4}
							style:transform="translateY(-50%)"
							style:margin-top="0.5rem"
						/>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	/* .item-m-top {
		margin-top: 0.375rem;
	}

	.item-m-bottom {
		margin-bottom: 0.375rem;
	} */

	.link-offset {
		margin-top: 0.75rem;
	}

	.marginRight {
		margin-right: 20px;
	}
	.marginRight-1 {
		margin-right: 40px;
	}
	.barWidth {
		width: 20px;
	}
	.barWidth-1 {
		width: 40px;
	}
	.ml-legend {
		margin-left: 5.3rem;
	}
	.ml-legend-single {
		margin-left: 10rem;
	}
	.helper-line-first {
		width: 120px;
	}
	@media only screen and (min-width: 600px) {
		.link-offset {
			margin-top: 1.25rem;
		}
		.marginRight {
			margin-right: 50px;
		}

		.marginRight-1 {
			margin-right: 70px;
		}
		.barWidth {
			width: 50px;
		}

		.barWidth-1 {
			width: 70px;
		}

		.helper-line-first {
			width: 50px;
		}
		.ml-legend {
			margin-left: 7.3rem;
		}
		/* … */
	}
</style>
