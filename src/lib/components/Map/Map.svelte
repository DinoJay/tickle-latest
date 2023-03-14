<script>
	import { store } from '/src/stores/index';
	import ImgMarker from '$lib/components/map/markers/ImgMarker.svelte';
	import Mapbox from '$lib/components/map/Mapbox.svelte';
	import MapMarker from '$lib/components/map/markers/MapMarker.svelte';
	import Recenter from '$lib/components/map/utils/Recenter.svelte';

	export let cards = [];
	export let onClick = () => {};
	export let centerLocation = { longitude: 0, latitude: 0 };
	export let recenter = true;
	export let interactive = true;

	let userAvatar = $store.currentUser?.avatar || 'selfMotivation';

	const defaultLoc = [4.30566702865358, 50.8862008375488];
	$: userLocation = $store.currentUser?.location
		? { lon: $store.currentUser.location.longitude, lat: $store.currentUser.location.latitude }
		: { lon: defaultLoc[0], lat: defaultLoc[1] };
</script>

<Mapbox lon={userLocation.lon} lat={userLocation.lat} zoom={13}>
	{#each cards as card (card.id)}
		<MapMarker
			onClick={() => onClick(card.id)}
			lon={card.loc.longitude}
			lat={card.loc.latitude}
			label={card.title}
		/>
	{/each}
	<ImgMarker {...userLocation} {userAvatar} />
	{#if recenter}
		<Recenter {...userLocation} {userAvatar} onClick={() => onClick(null)} />
	{/if}
</Mapbox>
