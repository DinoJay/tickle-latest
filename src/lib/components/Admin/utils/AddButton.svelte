<script>
	export let addButtonContent = '';
	export let onClick = () => {};
</script>

<button
	class="flex w-full 
	whitespace-nowrap text-ellipsis text-xl p-1 
	"
	on:click={() => onClick()}
>
	<p class="m-auto">
		{addButtonContent}
	</p>
</button>
