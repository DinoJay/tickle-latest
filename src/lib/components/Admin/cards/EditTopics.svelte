<script>
	import PreviewCard from '$lib/components/PreviewCard.svelte';
	import Spinner from '$lib/components/utils/Spinner.svelte';
	import { titleLocales } from '$lib/constants/locales';
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

	export let selLang;
	export let onChange;
	export let onClose;

	$: selectedTopics =
		!!topicIds && !!allTopics ? topicIds.map((id) => allTopics.find((d) => d.id === id)) : [];
	$: otherTopics = !!allTopics ? allTopics.filter((t) => !topicIds?.includes(t.id)) : [];

	$: console.log({ selectedTopics, otherTopics });
</script>

{#if allTopics !== undefined}
	<div class="flex-grow flex flex-col">
		<p class="text-lg mb-3">Please Click on a topic to select it</p>
		<div class="flex-grow flex flex-col">
			<h2 class="text-lg mb-1 flex-shrink-0">All Topics</h2>

			{#if otherTopics === undefined || otherTopics.length === 0}
				<div class="text-center m-12 text-xl placeholder-text">
					Please add a Topic first in the Topics tab!
				</div>
			{/if}
			<div class="flex flex-wrap gap-3 flex-grow overflow-y-auto p-2">
				{#each otherTopics as t}
					<PreviewCard
						title={t[titleLocales[selLang]]}
						img={t.img}
						onClick={() => onChange([...(topicIds || []), t.id])}
					/>
				{/each}
			</div>
		</div>
		<div class="flex-grow flex flex-col">
			<h2 class="text-lg mb-1 flex-shrink-0">Selected Topics</h2>

			{#if !selectedTopics || selectedTopics.length === 0}
				<div class="text-center m-12 placeholder-text">No Topics added</div>
			{/if}
			{#if selectedTopics || selectedTopics.length > 0}
				<div class="flex flex-wrap gap-3 flex-grow overflow-y-auto p-2">
					{#each selectedTopics as t}
						<PreviewCard
							highlighted={true}
							title={t[titleLocales[selLang]]}
							img={t.img}
							onClick={() => onChange(topicIds.filter((id) => id !== t.id))}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="m-auto">
		<Spinner />
	</div>
{/if}
