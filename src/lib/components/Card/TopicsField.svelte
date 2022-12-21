<script>
	export let topics;

	console.log('topix', topics);
</script>

<div class="flex flex-wrap gap-1">
	{#each topics as t}
		<div class="text-white px-1" style="background:{t.color}">{t.title}</div>
	{/each}
</div>
