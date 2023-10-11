<script>
	import TabItem from './TabItem.svelte';
	import ExtTabItem from './ExtTabItem.svelte';
	import { onDestroy, onMount } from 'svelte';

	export let title;

	let w;
	function handleResize() {
		console.log('resize', window.innerWidth);
		w = window.innerWidth;
	}

	onMount(() => {
		w = window.innerWidth;
		window.window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		window.removeEventListener('resize', handleResize);
	});

	$: console.log('w', w);
</script>

{#if w < 500}
	<TabItem {title}>
		<slot />
	</TabItem>
{:else}
	<ExtTabItem {title}>
		<slot />
	</ExtTabItem>
{/if}
