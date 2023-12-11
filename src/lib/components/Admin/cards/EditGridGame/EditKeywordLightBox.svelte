<script>
	import { assign } from 'svelte/internal';
	import LightBox from '$lib/components/utils/LightBox.svelte';

	export let selKeyword;
	export let concepts;
	export let onClose;
	export let onChange;
	export let onRemove;
</script>

<LightBox isOpen={!!selKeyword} title={selKeyword?.title} close={onClose}>
	<div class="mb-3">
		<div class="label">Keyword Title</div>
		<input
			type="text"
			class="input-text text-lg w-full"
			value={selKeyword?.title}
			placeholder="Enter keyword"
			on:change={(e) => onChange({ ...selKeyword, title: e.target.value })}
		/>
	</div>
	<div class="flex-grow flex gap-1 mb-auto">
		{#if concepts.length === 0}
			<div class="m-auto placeholder-text">No Concepts created</div>
		{/if}
		{#each concepts as c}
			<li
				class:disabled={selKeyword.conceptId !== c.id}
				class="flex bg-gray-700 text-white p-2 cursor-pointer"
				on:click={() => {
					onChange({
						...selKeyword,
						conceptId: selKeyword.conceptId === c.id ? null : c.id
					});
				}}
				on:keydown={(d) => null}
			>
				<div>{c.title}</div>
			</li>
		{/each}
	</div>
	<button
		class="mt-3 del-btn"
		on:click={() => {
			onRemove(selKeyword.id);
		}}>Delete</button
	>
	<button
		class="btn mt-3"
		on:click={() => {
			onClose();
		}}>Close</button
	>
</LightBox>
