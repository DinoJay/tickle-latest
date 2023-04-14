<script>
	export let img = { url: '' };
	export let title = '';
	export let onClick = (d) => d;
	export let cls = '';
	export let highlighted = false;

	// $: console.log('highlighted', highlighted);
</script>

<div
	on:click={onClick}
	on:keydown={onClick}
	class="flex flex-col {cls} p-1 sm:p-2 relative overflow-hidden
		bg-white  drop-shadow-md cursor-pointer hover:scale-105 transition-all  "
>
	{#if !!title}
		<h1 class="shrink-0 title sm:block hidden ">
			{title}
		</h1>
	{:else}
		<div class="ph-row">
			<div class="ph-col-12 big hidden sm:block" />
		</div>
	{/if}
	{#if !!img?.url}
		<div
			class="mt-1 flex-grow bg-cover"
			style="background-image: url({img?.url})"
			style:filter={!highlighted ? 'grayscale(100%)' : ''}
		/>
	{:else}
		<div class="flex-grow flex flex-col mt-1 ">
			<div class="flex-grow bg-gray-300 " />
		</div>
	{/if}
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
