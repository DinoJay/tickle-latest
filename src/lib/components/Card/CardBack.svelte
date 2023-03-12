<script>
	import Comments from '../Comments/index.svelte';
	export let selectedEnvId;
	export let cardId;
	export let uid;
</script>

<div class="flex-grow flex flex-col">
	<Comments {selectedEnvId} {cardId} {uid} />
</div>
