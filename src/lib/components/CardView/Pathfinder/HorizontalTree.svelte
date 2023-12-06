<script>
	import Description from '$lib/components/Card/Description.svelte';
	import group from '$lib/group';

	export let nodes;
	export let pathCardIds;

	$: gs = [...group(nodes, (d) => d.depth)].map(([key, values]) => ({ key, values }));
	$: console.log('gs', gs);
	$: maxLevel = Math.max(...gs.map((d) => d.key));
</script>

<div class="p-2 flex">
	{#each gs as g}
		<div class="flex flex-col items-center">
			{#each g.values as d}
				<div class="flex flex-col items-center">
					<div
						class="w-10 h-10 rounded-full"
						class:bg-gray-700={!pathCardIds.includes(d.data.id)}
						class:bg-green-700={pathCardIds.includes(d.data.id)}
						style:background={d.color}
					/>
					<div class="text-xs">{d.data.name}</div>
				</div>
			{/each}
		</div>
	{/each}
</div>
