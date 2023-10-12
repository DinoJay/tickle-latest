<script>
	import ExtTabs from './Tabs.svelte';
	import { onDestroy, onMount } from 'svelte';

	let w;
	function handleResizeX() {
		console.log('resize');
		w = window.innerWidth;
	}

	onMount(() => {
		w = window.innerWidth;
		window.window.addEventListener('resize', handleResizeX);
	});

	onDestroy(() => {
		window.removeEventListener('resize', handleResizeX);
	});
</script>

<ExtTabs single={w < 500}>
	<slot />
</ExtTabs>
