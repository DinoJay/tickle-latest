<script>
	import TickleWobble from './TickleWobble.svelte';
	import { loadCardEnvironments } from '/src/stores/index';
</script>

{#await loadCardEnvironments()}
	<TickleWobble />
{:then _}
	<slot />
{/await}
