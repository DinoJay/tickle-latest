<script>
	import ArrowRightDropCircleOutline from 'svelte-material-icons/ArrowRightDropCircleOutline.svelte';

	export let title = '';
	export let height = null;

	let expanded = false;
</script>

<!-- Main block -->
<div
	class="transition-all {expanded
		? 'expanded '
		: ''} p-2 flex flex-col border-2 border-c-black custom-shadow "
	style={height !== null && expanded ? `height:${height}` : ''}
>
	<div
		on:keydown={() => null}
		class="flex {expanded ? 'mb-3' : ''}  w-full flex-none justify-center cursor-pointer "
		on:click={() => {
			expanded = !expanded;
		}}
	>
		<span class=" mr-2 transition-all {expanded ? 'rotate' : ''}">
			<ArrowRightDropCircleOutline size={24} />
		</span>
		<h1 class=" text-xl font-medium crop">
			{title}
		</h1>
	</div>

	{#if expanded}
		<slot />
	{/if}
</div>

<style>
	.panel-container {
		transition: all 0.3s ease;
	}

	.expanded {
		max-height: 40rem;
	}

	.rotate {
		transform: rotate(90deg);
	}

	.custom-shadow {
		box-shadow: 5px 5px 5px #a6a29f;
	}
</style>
