<script>
	export let width;
	export let height;
	export let root;

	export let center = [width / 2, height / 2];

	import radial from './radial';

	$: console.log('root', root);

	const pad = 70;
	const rad = radial()
		.size([width / 2 - pad, height / 2 - pad])
		.center(center);

	console.log('root', root);
	$: nodes = root.children ? rad(root.children) : [];

	const [w, h] = [30, 30];

	// $: console.log('nodes', nodes);
</script>

<div class="relative" style:width={`${width}px`} style:height={`${height}px`}>
	<div
		class="absolute border-gray-700 border-2"
		style:width={`${w}px`}
		style:height={`${h}px`}
		style:left={center[0] - w / 2 + 'px'}
		style:top={center[1] - w / 2 + 'px'}
	>
		{root.data.name}
	</div>

	{#each nodes as d}
		{#if !d.children}
			<div
				class="absolute bg-gray-700"
				style:background={d.color}
				style:width={`${w}px`}
				style:height={`${h}px`}
				style:left={d.x - w / 2 + 'px'}
				style:top={d.y - h / 2 + 'px'}
			/>
		{:else}
			<svelte:self center={[d.x + 300, d.y + 300]} {width} {height} root={d} />
		{/if}
	{/each}
</div>
