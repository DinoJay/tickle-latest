<script>
	import { store } from '/src/stores/index';
	import ImgMarker from '$lib/components/map/markers/ImgMarker.svelte';
	import Mapbox from '$lib/components/map/Mapbox.svelte';
	import DraggableMarker from '$lib/components/map/markers/DraggableMarker.svelte';
	import Circle from '$lib/components/map/Circle.svelte';
	import Recenter from '$lib/components/map/utils/Recenter.svelte';
	import MapMarker from './markers/MapMarker.svelte';

	// export let onClick = () => {};
	// export let recenter = true;
	/**
	 * @type {{ lon: any; lat: any;  } }
	 */
	export let location;
	/**
	 * @type {(arg0: { lon: any; lat: any; }) => any }
	 */
	export let onChange;

	/**
	 * @type {number}
	 */
	export let radiusInM;

	// let userAvatar = $store.currentUser?.avatar || 'selfMotivation';
</script>

<Mapbox lon={location.lon} lat={location.lat} zoom={13}>
	<DraggableMarker
		onClick={() => {}}
		draggable={!!onChange}
		onChange={(/** @type {any} */ lon, /** @type {any} */ lat) => onChange && onChange(lon, lat)}
		{...location}
	/>
	<!-- {#if !!radiusInM} -->
	<Circle {...location} {radiusInM} />
	<!-- {/if} -->
	<!-- <ImgMarker {...userLocation} {userAvatar} /> -->
	<!-- {#if recenter}
		<Recenter {...userLocation} {userAvatar} onClick={() => onClick(null)} />
	{/if} -->
</Mapbox>
