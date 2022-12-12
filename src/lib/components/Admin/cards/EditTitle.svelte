<script>
	export let value;
	export let onChange;

	console.log('value', value);
</script>

<div>
	<input {value} class="border-2 p-2 w-full" on:input={(e) => onChange(e.target.value)} />
</div>
