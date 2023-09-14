<script>
	import LinkIcon from 'svelte-material-icons/LinkVariant.svelte';
	/**
	 * @type {any[]}
	 */
	export let links;
	export let cls = '';
</script>

<div class="{cls} flex flex-wrap">
	{#each links as l}
		<div class="px-1 flex items-center">
			<LinkIcon />
			<a target="_blank" rel="noreferrer" class="text-blue-500" href={`${l.ref}`}>{l?.name}</a>
		</div>
	{/each}
</div>
