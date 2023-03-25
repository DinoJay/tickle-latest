<script>
	export let value;
	export let onChange;
	export let onClose;

	console.log('value', value);
</script>

<input {value} class="border-2 p-2 w-full" on:input={(e) => onChange(e.target.value)} />
<button class="create-btn w-full mt-3" on:click={onClose}>Save & Close</button>
