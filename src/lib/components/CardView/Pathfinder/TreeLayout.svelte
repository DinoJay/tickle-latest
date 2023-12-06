<script>
	import Description from '$lib/components/Card/Description.svelte';

	export let width;
	export let height;
	export let data;

	const [w, h] = [15, 15];
</script>

<div class="relative" style:width={`${width}px`} style:height={`${height}px`}>
	<svg class="absolute" style:width={`${width}px`} style:height={`${height}px`}>
		{#each data.slice(1) as d}
			<!-- <line x1={d.x} y1={d.y} x2={d.parent.x} y2={d.parent.y} stroke="black" stroke-width="1" /> -->
			<path
				fill="none"
				stroke="black"
				d={`
				M ${d.x} ${d.y}
				C ${(d.x + d.parent.x) / 2} ${d.y},
					${(d.x + d.parent.x) / 2} ${d.parent.y},
					${d.parent.x} ${d.parent.y}
			`}
			/>
		{/each}
	</svg>
	{#each data as d}
		<div
			class="absolute bg-gray-700"
			style:background={d.color}
			style:width={`${w}px`}
			style:height={`${h}px`}
			style:left={d.x - w / 2 + 'px'}
			style:top={d.y - h / 2 + 'px'}
		/>
	{/each}
</div>
