<script>
	import { getContext, onDestroy } from 'svelte';
	import { key, mapbox } from '../mapbox.js';
	import { ClickableMarker } from './ClickableMarker.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lon;
	export let lat;
	export let onChange;
	export let onClick;

	const marker = new ClickableMarker({ draggable: true }).setLngLat([lon, lat]).addTo(map);

	// Update coords when we select a new card
	$: if (lon || lat) {
		marker.setLngLat([lon, lat]);
	}

	marker.on('dragend', () => {
		let lngLat = marker.getLngLat();
		console.log('dragend');
		onChange(lngLat.lng, lngLat.lat);
	});

	marker.onClick(onClick);

	onDestroy(() => {
		marker.remove();
	});
</script>
