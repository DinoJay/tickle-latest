<script>
	import { afterUpdate } from 'svelte';
	export let open;

	let el;
	afterUpdate(() => {
		el?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
	});
</script>

<slot name="header" />

{#if open}
	<div class="p-2" bind:this={el}>
		<slot name="content" />
	</div>
{/if}
