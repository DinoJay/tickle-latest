<script>
	import { v4 as uuidv4 } from 'uuid';

	import EditConceptLightBox from './EditConceptLightBox.svelte';
	import EditKeywordLightBox from './EditKeywordLightBox.svelte';
	// import { togglePopUp } from '../../../stores/popUpStore';

	// export let envId;
	/**
	 * @type {(arg0: { groups: any; }) => void}
	 */
	export let onChange;
	export let value;

	let selKeywordId = null;
	let selConceptId = null;

	const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	console.log('value', value);
</script>

<h2 class="label text-lg">Keywords</h2>
{#if value?.keywords !== undefined && value?.keywords?.length > 0}
	<div class="mb-auto w-full flex-grow overflow-auto grid grid-cols-3 gap-1">
		{#each value.keywords as k}
			{@const concept = value?.concepts?.find((c) => c.id === k.conceptId)?.title}
			<button class="p-2 bg-gray-700 text-white" on:click={() => (selKeywordId = k.id)}>
				{k.title}
				{#if !!concept}
					({concept})
				{/if}
			</button>
		{/each}
	</div>
{:else}
	<div class=" m-auto placeholder-text">No Keyword created</div>
{/if}
<button
	class="btn flex-grow mt-3"
	on:click={() => {
		onChange({
			...value,
			keywords: [
				...(value?.keywords || []),
				{ id: uuidv4(), title: `Keyword ${abc[value?.keywords?.length || 0]}` }
			]
		});
	}}>Add Keyword</button
>

<h2 class="label text-lg mt-3">Concepts</h2>
{#if value?.concepts !== undefined && value?.concepts.length > 0}
	<div class="mb-auto w-full flex-grow overflow-auto grid grid-cols-3 gap-1">
		{#each value.concepts as k}
			<button class="p-2 bg-gray-700 text-white" on:click={() => (selConceptId = k.id)}>
				{k.title}
			</button>
		{/each}
	</div>
{:else}
	<div class=" m-auto placeholder-text">No Concept created</div>
{/if}

<div class="flex mt-3 mb-3">
	<button
		class="btn flex-grow"
		on:click={() => {
			onChange({
				...value,
				concepts: [
					...(value?.concepts || []),
					{ id: uuidv4(), title: `Concept ${abc[value?.concepts?.length || 0]}`, keywordIds: [] }
				]
			});
		}}>Add Concept</button
	>
</div>

<EditConceptLightBox
	selConcept={value?.concepts?.find((d) => d.id === selConceptId)}
	onChange={(c) => {
		const newConcepts = value.concepts.map((d) => (d.id === c.id ? c : d));
		onChange({ ...value, concepts: newConcepts });
	}}
	onRemove={(id) => {
		const newConcepts = value.concepts.filter((d) => d.id !== id);
		onChange({ ...value, concepts: newConcepts });
	}}
	onClose={() => (selConceptId = null)}
/>

<EditKeywordLightBox
	concepts={value?.concepts || []}
	selKeyword={value?.keywords?.find((d) => d.id === selKeywordId)}
	onChange={(kw) => {
		const newKeywords = value.keywords.map((d) => (d.id === kw.id ? kw : d));
		onChange({ ...value, keywords: newKeywords });
	}}
	onRemove={(id) => {
		const newKeywords = value.keywords.filter((d) => d.id !== id);
		onChange({ ...value, keywords: newKeywords });
	}}
	onClose={() => (selKeywordId = null)}
/>
