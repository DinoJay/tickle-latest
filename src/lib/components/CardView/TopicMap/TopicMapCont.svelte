<script>
	import { calcLayout, getRadius } from './venn/index';

	export let cards = [{}];
	export let selectedCardId = null;
	export let topics;
	export let w;
	export let h;
	export let onClick = () => {};

	const width = w * 0.95;
	const height = h;

	let circleVals = [];
	let labels = [];
	let newNodes = [];
	let colors = [];

	const NODERAD = 12;
	$: layout = calcLayout({ cards, topics, width, height, NODERAD });

	$: console.log('color', layout);
	$: getTopic = (title) => topics.find((d) => d.title === title);
</script>

<div class="flex w-full ">
	<div class="m-auto relative overflow-auto" style="height:{height}px;width:{width}px;">
		{#each layout.circleVals as c}
			<div
				class="absolute border border-sky-500 rounded-full center opacity-20"
				style="left:{c.value.x}px;top:{c.value.y}px;width:{c.value.radius * 2}px;height:{c.value
					.radius * 2}px;background:{getTopic(c.title).color};"
			/>
		{/each}
		{#each layout.labels as l}
			<div
				class="absolute center text-center"
				style="left:{l.x}px;top:{l.y - 30}px;width:{1 * getRadius(l.text, layout.circleVals)}px"
			>
				{l.text}
			</div>
		{/each}
		{#each layout.nodes as n}
			<button
				on:click={() => {
					onClick(n.id);
				}}
				class="absolute z-10 bg-gray-700 rounded-full opacity-40 {n.id === selectedCardId
					? 'highlighted_center'
					: 'center'}"
				style="width:{NODERAD * 2}px;height:{NODERAD * 2}px;left:{n.x}px;top:{n.y}px"
			/>
		{/each}
	</div>
</div>

<style>
	.highlighted_center {
		transform: translate(-50%, -50%) scale(1.4);
		@apply border-2 border-black transition;
		background: black;
		opacity: 0.7;
	}
	.center {
		transform: translate(-50%, -50%);
	}
</style>
