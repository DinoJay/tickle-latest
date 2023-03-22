<script>
	import PreviewCard from '../PreviewCard.svelte';
	import { goto } from '$app/navigation';

	export let collectedCards;
	export let selectedEnvId;
	export let allTags;
</script>

<h2 class="text-lg mb-1">All Collected Cards</h2>
<div class=" flex flex-wrap gap-2 mx-auto flex-grow mb-4">
	{#each collectedCards as c}
		<PreviewCard {...c} onClick={() => goto(`/diary/${selectedEnvId}/${c.id}`)} />
	{/each}
	{#if collectedCards.length === 0}
		<div class="text-lg m-auto h-36 flex border-2 border-gray-400 w-full">
			<div class="m-auto">No cards collected!</div>
		</div>
	{/if}
</div>
{#each allTags as t}
	<div class="mb-4">
		<h2 class="mb-2 text-lg">
			{t.openCards.length} Open Cards in
			<span class="text-white p-1" style="background: {t.color}">{t.title}</span>
		</h2>
		<div class="flex flex-wrap gap-2">
			{#each t.openCards as c}
				<PreviewCard {...c} onClick={() => goto(`/diary/${selectedEnvId}/${c.id}`)} />
			{/each}
		</div>
	</div>
{/each}
