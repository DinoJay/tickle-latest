<script>
	import Comments from '../Comments/index.svelte';
	export let selectedEnvId;
	export let cardId;
	export let uid;
</script>

<div>
	<Comments {selectedEnvId} {cardId} {uid} />
</div>
