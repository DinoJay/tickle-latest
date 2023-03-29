<script>
	/**
	 * @type {{ toString: () => void; }}
	 */
	export let value;
	export let name;
	export let onClick;
	export let type;
	export let accessor = (d) => d;

	const reducer = (value) => {
		return value.reduce(
			(acc, cur, i) => acc.concat(i < value.length - 1 ? `${accessor(cur)}, ` : accessor(cur)),
			''
		);
	};
</script>

<div
	on:keydown={onClick}
	on:click={onClick}
	style="min-width:7rem;max-width:7rem"
	class="border-2 py-1 px-2 text-xl h-20 flex flex-col cursor-pointer "
>
	<div class="crop">{name}:</div>
	<div class="italic flex-grow text-gray-500 crop overflow-hidden">
		{#if type === 'array' && Array.isArray(value)}
			<div>
				{#if value?.length > 0}
					{#if accessor}
						{reducer(value)}
					{:else}
						{value.toString()}
					{/if}
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
