<script>
	export let value;
	export let onChange;
</script>

<div>
	<textarea
		style="height:22rem"
		{value}
		class="border-2 p-2 w-full"
		on:input={(e) => onChange(e.target.value)}
	/>
</div>
