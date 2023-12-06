<script>
	import { children } from 'svelte/internal';
	import Description from '$lib/components/Card/Description.svelte';

	export let width;
	export let height;
	export let datum;

	import radial from './radial';
	import TagBox from './TagBox.svelte';

	console.log('radial', radial);

	const center = [width / 2, height / 2];
	const [w, h] = [30, 30];
	const pad = 20;
	const rad = radial()
		.size([width / 2 - w, height / 2 - h])
		.center(center);

	$: nodes = rad(datum.children);

	$: console.log('nodes', nodes);
</script>

<div class="relative" style:width={`${width}px`} style:height={`${height}px`}>
	<div
		class="absolute border-gray-700 border-2"
		style:width={`${w}px`}
		style:height={`${h}px`}
		style:left={center[0] - w / 2 + 'px'}
		style:top={center[1] - w / 2 + 'px'}
	>
		{datum.name}
	</div>

	{#each nodes as d (d.id)}
		<div
			class="absolute bg-gray-700"
			style:background={d.color}
			style:width={`${w}px`}
			style:height={`${h}px`}
			style:left={d.x - w / 2 + 'px'}
			style:top={d.y - h / 2 + 'px'}
		/>
		<TagBox topics={d.topics} width={w} height={h} x={d.x} y={d.y} />
	{/each}
</div>
