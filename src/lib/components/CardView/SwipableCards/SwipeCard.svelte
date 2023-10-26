<script>
	import { getContext, onMount } from 'svelte';

	const { cards } = getContext('swipeableCards');

	let index;
	onMount(() => {
		// compute index
		index = $cards.length;

		// add a record to the tabs store
		$cards = [...$cards, { index }];
	});

	$: card = $cards[index];
	$: console.log('card', card);
</script>

<div>
	<slot />
</div>
