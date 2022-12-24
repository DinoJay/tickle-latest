<script>
	import Comments from '$lib/components/Comments/index.svelte';
	export let selectedEnvId;
	export let cardId;
	export let uid;
</script>

<Comments {selectedEnvId} {cardId} {uid} />
