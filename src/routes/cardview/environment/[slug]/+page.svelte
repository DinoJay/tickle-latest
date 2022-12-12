<script>
	import { page } from '$app/stores';
	import LoadEnvironments from '$lib/components/utils/LoadEnvironments.svelte';
	import LoadCards from '$lib/components/utils/LoadCards.svelte';
	import CardViewPage from '$lib/components/cardView/CardView.svelte';
	import ListenUserLocation from '$lib/components/geoLocation/ListenUserLocation.svelte';

	$: environmentId = $page.params.slug;
	$: console.log('id environment', $page.params);
</script>

<ListenUserLocation />
<LoadEnvironments>
	<LoadCards {environmentId} />
	<CardViewPage selectedEnvironment={environmentId} />
</LoadEnvironments>
