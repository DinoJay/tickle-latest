<script>
	import PreviewCard from '$lib/components/PreviewCard.svelte';
	import { get_all_dirty_from_scope } from 'svelte/internal';
	export let topicIds;
	export let allTopics;
	export let onChange;

	$: selectedTopics = !!topicIds ? topicIds.map((id) => allTopics.find((d) => d.id === id)) : [];
	$: otherTopics = allTopics.filter((t) => !topicIds?.includes(t.id));
	$: console.log('alltopics', allTopics);
</script>

<div class="flex-grow flex flex-col  ">
	<div class="flex-grow flex flex-col ">
		<h2 class="text-lg mb-1 flex-shrink-0">all Topics</h2>

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

		<div class="flex flex-wrap gap-3 flex-grow overflow-y-auto p-2">
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
