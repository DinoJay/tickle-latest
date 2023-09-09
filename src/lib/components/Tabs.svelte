<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	// context is not reactive, so it's common to use stores together with context to get reactivity.
	const tabs = writable([]);

	// track which tab is active
	let activeIndex = 0;

	// create a context called "tabs" to share the store with children
	setContext('tabs', { tabs });

	// update the tabs store whenever the active index changes
	// it will cause children to update since they are subscribed to the store
	$: $tabs = $tabs.map((tab, i) => {
		return {
			...tab,
			active: i == activeIndex
		};
	});
</script>

<nav class="flex flex-wrap gap-1 mb-3">
	{#each $tabs as tab, i}
		<button
			class="btn flex-1"
			class:sel-btn={tab.active}
			class:opacity-70={!tab.active}
			on:click={() => (activeIndex = i)}
			style:background={tab.color}
		>
			{tab.title}
		</button>
	{/each}
</nav>

<slot />

<style>
</style>
