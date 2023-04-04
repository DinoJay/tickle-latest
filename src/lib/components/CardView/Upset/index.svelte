<script>
	import UpsetCont from './UpsetCont.svelte';

	export let cards;
	let selectedTopicId = null;

	$: filteredCards = cards?.filter((c) => {
		if (selectedTopicId === null) {
			return true;
		}
		return c.topicIds?.includes(selectedTopicId);
	});
</script>

<UpsetCont
	{...$$props}
	cards={filteredCards}
	{selectedTopicId}
	onSelectTopicId={(id) => (selectedTopicId = id)}
/>
