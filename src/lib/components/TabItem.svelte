<script>
	import { slide } from 'svelte/transition';
	import { getContext, onMount } from 'svelte';

	// get the tabs store from the context
	const { tabs } = getContext('tabs');

	export let title;
	export let color;
	let index;

	// pull out current tab, updates whenever store changes
	// ie, if tab.active changes, it will cause this to update
	$: tab = $tabs[index];

	onMount(() => {
		// compute index
		index = $tabs.length;

		// add a record to the tabs store
		$tabs = [...$tabs, { title, color }];
	});
</script>

{#if tab && tab.active}
	<slot />
{/if}
