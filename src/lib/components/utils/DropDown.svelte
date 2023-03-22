<script>
	import { afterUpdate } from 'svelte';

	import { slide } from 'svelte/transition';
	export let open;

	let el;
	afterUpdate(() => {
		el?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
	});
</script>

<slot name="header" />

{#if open}
	<div transition:slide class="p-2" bind:this={el}>
		<slot name="content" />
	</div>
{/if}
