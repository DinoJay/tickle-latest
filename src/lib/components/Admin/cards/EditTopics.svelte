<script>
	import PreviewCard from '$lib/components/PreviewCard.svelte';
	export let topicIds;
	export let allTopics;
	export let onChange;

	$: selectedTopics = topicIds.map((id) => allTopics.find((d) => d.id === id));
	$: otherTopics = allTopics.filter((t) => !topicIds.includes(t.id));
</script>

<div class="flex-grow flex flex-col  pb-3">
	<div class="flex-grow flex flex-col">
		<h2 class="text-lg mb-1 flex-shrink-0">all Topics</h2>

		<div class="flex flex-wrap gap-3 flex-grow overflow-y-auto">
			{#each otherTopics as t}
				<PreviewCard title={t.title} img={t.img} onClick={() => onChange([...topicIds, t.id])} />
			{/each}
		</div>
	</div>
	<div class="flex-grow flex flex-col">
		<h2 class="text-lg mb-1 flex-shrink-0">Selected Topics</h2>

		<div class="flex flex-wrap gap-3 flex-grow overflow-y-auto">
			{#each selectedTopics as t}
				<PreviewCard
					title={t.title}
					img={t.img}
					onClick={() => onChange(topicIds.filter((id) => id !== t.id))}
				/>
			{/each}
		</div>
	</div>
</div>
