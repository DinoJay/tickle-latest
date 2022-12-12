<script>
	import PreviewCard from '$lib/components/PreviewCard.svelte';

	export let cards;

	const itemsPerPage = 9;
	let currentPage = 1;
	$: numPages = Math.ceil(cards.length / itemsPerPage);
	$: numPagesShown = Math.min(numPages, 20);
	$: currentItems = cards.slice(currentPage - 1, currentPage + itemsPerPage - 1);
</script>

{#if cards.length > 0}
	<div class="flex-grow flex flex-col overflow-y-auto">
		<div class="flex  flex-wrap gap-2 ">
			{#each currentItems as c}
				<div on:click={() => onClick(c)}>
					<PreviewCard title={c.title} />
				</div>
			{/each}
		</div>
		<div class="flex-shrink-0 flex flex-wrap overflow-y-scroll">
			{#each Array.from(Array(numPagesShown)) as _, i}
				<button class="p-1 border-1">{i + 1}</button>
			{/each}
		</div>
	</div>
{/if}
