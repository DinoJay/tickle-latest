<script>
	/**
	 * @type {{ toString: () => void; }}
	 */
	export let value;
	export let name;
	export let onClick;
	export let type;

	console.log('name', name, 'value', value);
</script>

<div
	on:keydown={onClick}
	on:click={onClick}
	style="min-width:8rem;max-width:8rem"
	class="border-2 py-1 px-2 text-xl h-28 flex flex-col cursor-pointer "
>
	<div>{name}:</div>
	<div class="italic flex-grow text-gray-500 crop overflow-hidden">
		{#if type === 'array'}
			<div>
				{#if value?.length > 0}
					{value.toString()}
				{:else}
					Empty
				{/if}
			</div>
		{:else}
			<div>
				{#if !!value}
					{value}
				{:else}
					Empty
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.crop {
		overflow-wrap: break-word;
		hyphens: manual;
	}
</style>
