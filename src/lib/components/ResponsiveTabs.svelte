<script>
	import Tabs from './Tabs.svelte';
	import ExtTabs from './ExtTabs.svelte';
	import { onDestroy, onMount } from 'svelte';

	let w;
	function handleResize() {
		console.log('resize');
		w = window.innerWidth;
	}

	onMount(() => {
		w = window.innerWidth;
		window.window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		window.removeEventListener('resize', handleResize);
	});
</script>

{#if w < 768}
	<Tabs>
		<slot />
	</Tabs>
{:else}
	<ExtTabs>
		<slot />
	</ExtTabs>
{/if}
