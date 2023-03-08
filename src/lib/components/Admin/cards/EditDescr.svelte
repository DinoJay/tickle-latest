<script>
	export let value;
	export let onChange;
</script>

<div>
	<textarea
		style="height:22rem"
		placeholder="Enter your description"
		{value}
		class="border-2 p-2 w-full"
		on:input={(e) => onChange(e.target.value)}
	/>
</div>
