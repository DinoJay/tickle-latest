<script>
	import PreviewCard from '$lib/components/PreviewCard.svelte';
	/**
	 * @type {string[]}
	 */
	export let topicIds;
	/**
	 * @type {any[]}
	 */
	export let allTopics;
	/**
	 * @type {(arg0: any[]) => any}
	 */
	export let onChange;
	export let onClose;

	$: selectedTopics = !!topicIds ? topicIds.map((id) => allTopics.find((d) => d.id === id)) : [];
	$: otherTopics = allTopics.filter((t) => !topicIds?.includes(t.id));
</script>

<div class="flex-grow flex flex-col">
	<p class="text-lg mb-3">Please Click on a topic to select it</p>
	<div class="flex-grow flex flex-col">
		<h2 class="text-lg mb-1 flex-shrink-0">All Topics</h2>

		{#if !otherTopics || otherTopics.length === 0}
			<div class="text-center m-12 text-xl">No Topics</div>
		{/if}
		<div class="flex flex-wrap gap-3 flex-grow overflow-y-auto p-2">
			{#each otherTopics as t}
				<PreviewCard
					title={t.title}
					img={t.img}
					onClick={() => onChange([...(topicIds || []), t.id])}
				/>
			{/each}
		</div>
	</div>
	<div class="flex-grow flex flex-col">
		<h2 class="text-lg mb-1 flex-shrink-0">Selected Topics</h2>

		{#if !selectedTopics || selectedTopics.length === 0}
			<div class="text-center m-12 text-xl">No Topics added</div>
		{/if}
		{#if selectedTopics || selectedTopics.length > 0}
			<div class="flex flex-wrap gap-3 flex-grow overflow-y-auto p-2">
				{#each selectedTopics as t}
					<PreviewCard
						highlighted={true}
						title={t.title}
						img={t.img}
						onClick={() => onChange(topicIds.filter((id) => id !== t.id))}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>

<button class="create-btn mt-auto" on:click={onClose}>Save & Close</button>
