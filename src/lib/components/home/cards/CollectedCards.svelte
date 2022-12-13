<script>
	import DisplayCards from './DisplayCards.svelte';

	export let selectedEnvironment = 'default';
	export let environments = {};
	export let userCardsIdForEachEnv = {};
</script>

<div class="text-center w-full h-full">
	<DisplayCards {selectedEnvironment} {userCardsIdForEachEnv} />
</div>
