<script>
	export let value = { items: [], description: '' };
	/**
	 * @type {(arg0: { description: any; items: never[]; }) => any}
	 */
	export let onChange;
	export let onClose;
</script>

<div class="mb-3 ">
	<div class="label text-2xl">Hint:</div>
	<textarea
		value={value?.description || ''}
		on:change={(e) => onChange({ ...value, description: e.target?.value || '' })}
		placeholder="Please enter your hint"
		class="input-text w-full h-24"
	/>
</div>

<button class="w-full create-btn mt-3" on:click={onClose}> Save & Close </button>

<style>
</style>
