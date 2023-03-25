<script>
	export let value;
	export let onChange;
	export let onClose;
</script>

<textarea
	style="height:22rem"
	placeholder="Enter your description"
	{value}
	class="border-2 p-2 w-full"
	on:input={(e) => onChange(e.target.value)}
/>
<button class="create-btn mt-auto" on:click={onClose}>Save & Close</button>
