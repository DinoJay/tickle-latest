<script>
	import { loadCards } from '../../../stores/index';

	export let environmentId = 'undefined';

	$: if (environmentId != 'undefined' && environmentId) {
		loadCards(environmentId);
	}
</script>

<slot />
