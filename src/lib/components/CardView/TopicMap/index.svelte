<script>
	import TopicMapCont from './TopicMapCont.svelte';
	export let visible;

	let w = null;
	let h = null;
</script>

<div bind:clientHeight={h} bind:clientWidth={w} class={visible ? 'visible flex-grow' : 'invisible'}>
	{#if !!w && !!h}
		<TopicMapCont {...$$props} {w} {h} />
	{/if}
</div>
