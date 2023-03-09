<script>
	import { getContext, onDestroy } from 'svelte';
	import { key, mapbox } from './mapbox.js';

	import { v4 as uuidv4 } from 'uuid';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lon;
	export let lat;
	export let radiusInM;

	const id = uuidv4();

	const paint = {
		'fill-color': '#38c172',
		'fill-opacity': 0.3
	};

	const createGeoJSONCircle = (
		/** @type {any[]} */ center,
		/** @type {number} */ radiusInM,
		points = 64
	) => {
		const coords = {
			latitude: center[1],
			longitude: center[0]
		};

		const km = radiusInM / 1000;

		const ret = [];
		const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
		const distanceY = km / 110.574;

		let theta;
		let x;
		let y;
		for (let i = 0; i < points; i++) {
			theta = (i / points) * (2 * Math.PI);
			x = distanceX * Math.cos(theta);
			y = distanceY * Math.sin(theta);
			const long = coords.longitude;
			const lat = coords.latitude;
			const longX = long + x;
			const latY = lat + y;

			ret.push([longX, latY]);
		}
		ret.push(ret[0]);

		return {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: {
							type: 'Polygon',
							coordinates: [ret]
						}
					}
				]
			}
		};
	};
	map.on('load', () => {
		// const id = uuidv4();
		// if (lon || lat || radiusInM) {

		// if (map.getLayer(id)) {
		// 	console.log('is there layer!!');
		// 	map.removeLayer(id);
		// 	map.removeSource(id);
		// }
		map.addSource(id, createGeoJSONCircle([lon, lat], radiusInM));

		map.addLayer({
			id,
			type: 'fill',
			source: id,
			layout: {},
			paint
		});
	});

	$: {
		// if (lon || lat || radiusInM) {
		if (map.isStyleLoaded()) {
			if (map.getLayer(id)) {
				console.log('is there layer!!');
				map.removeLayer(id);
				map.removeSource(id);
			}
			map.addSource(id, createGeoJSONCircle([lon, lat], radiusInM));
			map.addLayer({
				id,
				type: 'fill',
				source: id,
				layout: {},
				paint
			});
		}
		// map.on('load', () => {
		// });
		// }
	}

	onDestroy(() => {
		//TODO: does not work
		// if (!!map && map.removeLayer && map.removeSource) {
		// 	console.log('map', map);
		// 	map.removeLayer(id);
		// 	map.removeSource(id);
		// }
	});
</script>
