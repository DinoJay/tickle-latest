<script>
	import { hooks } from '../../../../../.svelte-kit/generated/client-manifest.js';
	import * as d3 from 'd3';
	import { lab } from 'd3';
	export let cards;
	export let topics;
	let selectedRow = null;

	const margin = '30px';
	const labelHeight = '8rem';
</script>

<div class="flex-grow flex  flex-col m-auto overflow-y-auto overflow-x-visible">
	<div class="flex items-center overflow-visible mb-3">
		{#each topics as t}
			<div
				class="flex-none w-6 relative overflow-visible"
				style:height={labelHeight}
				style:margin-right={margin}
			>
				<div
					class="pt-2 crop"
					style:background={t.color}
					style:height={labelHeight}
					style:writing-mode="vertical-rl"
					style:text-orientation="mixed"
				>
					{t.title}
				</div>
			</div>
		{/each}
	</div>

	<div class="flex overflow-y-auto">
		<div class=" flex flex-col">
			{#each cards as c, j}
				{@const lastIndex = topics?.findLastIndex((t) => c.topicIds.includes(t.id))}
				{@const firstIndex = topics?.findIndex((t) => c.topicIds.includes(t.id))}
				<div class="flex items-center">
					<!-- <div class="w-32">{c.title}</div> -->
					{#each topics as t, i}
						{@const topic = c.topics?.find((t2) => t2.id === t.id)}
						<div class="relative">
							<div
								on:click={() => (selectedRow = i)}
								on:keydown={() => (selectedRow = i)}
								class=" w-6 h-6 border-2 mb-3  {topic !== undefined
									? 'border-gray-700'
									: 'bg-white'}"
								style:background={topic !== undefined ? t.color : 'white'}
							/>
							{#if topic === undefined && i > firstIndex && i <= lastIndex}
								<div
									class="w-12 h-3  bg-gray-700 absolute left-0 top-0"
									style:transform="translateY(50%)"
								/>
							{/if}
						</div>
						{#if i < lastIndex && i >= firstIndex}
							<div
								class="h-3 bg-gray-700 "
								style:width={margin}
								style:transform="translateY(-50%)"
							/>
						{:else}
							<div class="" style:width={margin} style:transform="translateY(-50%)" />
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
