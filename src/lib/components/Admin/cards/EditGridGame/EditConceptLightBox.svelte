<script>
	import { assign } from 'svelte/internal';
	import LightBox from '$lib/components/utils/LightBox.svelte';

	export let selConcept;
	export let onClose;
	export let onChange;
	export let onRemove;
</script>

<LightBox isOpen={!!selConcept} title={selConcept?.title} close={onClose}>
	<div>
		<div class="label">Concept Title</div>
		<input
			type="text"
			class="input-text text-lg w-full"
			value={selConcept?.title}
			placeholder="Enter Concept"
			on:change={(e) => onChange({ ...selConcept, title: e.target.value })}
		/>
	</div>
	<button
		class="mt-3 del-btn"
		on:click={() => {
			onRemove(selConcept.id);
		}}>Delete</button
	>
	<button
		class="btn mt-3"
		on:click={() => {
			onClose();
		}}>Close</button
	>
</LightBox>
