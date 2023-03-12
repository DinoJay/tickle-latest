<script>
	import TopicMapCont from './TopicMapCont.svelte';
	export let visible;

	let w = null;
	let h = null;
	export let cards;
	// $: cardsWithDefaultTopic = cards?.map((c) => {
	// 	if (c.topics === undefined) {
	// 		console.log('hit');

	// 	}
	// });
	// $: console.log('cardsWithDefaultTopic', cardsWithDefaultTopic);
</script>

<div bind:clientHeight={h} bind:clientWidth={w} class={visible ? 'visible flex-grow' : 'invisible'}>
	{#if !!w && !!h}
		<TopicMapCont {...$$props} {w} {h} />
	{/if}
</div>
