<script>
	import { langDict } from './../../../stores/localizationStore.js';
	import OneComment from './OneComment.svelte';
	export let comments;
	/**
	 * @type {(arg0: { text: any; }) => void}
	 */
	export let onChange;

	/**
	 * @type {null|string}
	 */
	export let edit;
	export let onRemove;
	// export let uid;
	let inputTxt = null;
</script>

{#if !!comments && comments.length > 0}
	{#each comments as c}
		<OneComment {...c} {edit} {onRemove} />
	{/each}
{:else}
	<div class="flex-grow flex">
		<div class="m-auto placeholder-text">{$langDict.comments.no_comments}</div>
	</div>
{/if}

<div class=" mt-2 mb-2">
	<textarea
		class="form-text border-2 w-full"
		placeholder={$langDict.comments.enter_comment}
		bind:value={inputTxt}
	/>
</div>
<button
	class="mt-auto create-btn w-full {!!!inputTxt ? 'disabled' : ''}"
	on:click={() => {
		onChange({ text: inputTxt });
		inputTxt = null;
	}}
>
	{$langDict.comments.enter_comment}
</button>
