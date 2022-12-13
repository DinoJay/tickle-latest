<script>
	export let img = '';
	export let title = '';
	export let onClick = (d) => d;
	export let className = '';
</script>

<div
	on:click={onClick}
	on:keydown={onClick}
	class="flex flex-col h-36 w-28 p-2 relative overflow-hidden
		bg-white border-2 border-black drop-shadow-md cursor-pointer hover:scale-105 transition-all {className}"
>
	<h1 class="shrink-0 title">{title}</h1>
	<div class="flex-1 bg-cover" style="background-image: url({img?.url})" />
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
