<script>
	import { afterUpdate, onDestroy, setContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';
	import { store } from '/src/stores/index';

	setContext(key, {
		getMap: () => map
	});

	/**
	 * @type {number|null}
	 */
	export let lat = null;
	/**
	 * @type {number | null}
	 */
	export let lon = null;
	export let zoom = 13;
	export let interactive = true;

	let container;
	let map;

	const defaultLng = 4.39;
	const defaultLat = 50.82;
	function load() {
		map = new mapbox.Map({
			container,
			style: 'mapbox://styles/mapbox/streets-v9',
			zoom
		});

		map.setCenter({
			lng: lon || defaultLng,
			lat: lat || defaultLat
		});
		//TODO
		// if (!interactive) {
		// 	map.dragPan.disable();
		// 	map.doubleClickZoom.disable();
		// 	map.boxZoom.disable();
		// }
	}

	afterUpdate(() => {
		if (lon && lat && map) {
			map.flyTo({
				center: [lon, lat],
				essential: true
			});
		}
	});

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<!-- this special element will be explained in a later section -->
<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mapbox-gl/dist/mapbox-gl.css" on:load={load} />
</svelte:head>

<div bind:this={container}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	div {
		@apply relative;
		width: 100%;
		height: 100%;
	}
</style>
