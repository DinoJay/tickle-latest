<script>
	import LinkIcon from 'svelte-material-icons/LinkVariant.svelte';
	/**
	 * @type {any[]}
	 */
	export let links;
</script>

<div class="mb-3 mt-1 flex flex-wrap ">
	{#each links as l}
		<div class="px-1 flex items-center">
			<LinkIcon />
			<a target="_blank" rel="noreferrer" class="text-blue-500" href={`${l.ref}`}>{l?.name}</a>
		</div>
	{/each}
</div>
