<script>
	export let title;
	export let description;
	export let img;
	export let onClick = (d) => d;
</script>

<div
	on:keydown={onClick}
	on:click={onClick}
	class="flex flex-col border-2 drop-shadow-sm p-3 cursor-pointer"
	style="height:200px;max-width:150px;min-width:150px"
>
	<h2>{title}</h2>
	<div class="flex-grow bg-cover" style="background-image: url('{img?.url}');" />
</div>
