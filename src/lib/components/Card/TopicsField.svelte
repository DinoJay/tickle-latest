<script>
	export let topics;
	export let cls = '';
</script>

<div class="flex flex-wrap gap-1 {cls}">
	{#if !!topics}
		{#each topics as t}
			<div class="text-white px-1" style="background:{t.color}">{t.title}</div>
		{/each}
	{:else}
		<div class="ph-col-6 big" />
		<div class="ph-col-4 empty big" />
		<div class="ph-col-2 big" />
	{/if}
</div>
