<script>
	import { onMount, onDestroy } from 'svelte';
	import { store } from '/src/stores/index';

	/**
	 * @type {number }
	 */
	let watchId = 0;

	onMount(() => {
		function success(pos) {
			console.log('Congratulations, you reached the target', pos.coords);
			store.update((/** @type {{ currentUser: any; }} */ obj) => ({
				...obj,
				currentUser: {
					...obj.currentUser,
					location: { longitude: pos.coords.longitude, latitude: pos.coords.latitude }
				}
			}));
			console.log('store', $store);
		}

		function error(err) {
			console.error(`ERROR(${err.code}): ${err.message}`);
		}

		const options = {
			enableHighAccuracy: false,
			timeout: 5000,
			maximumAge: 0
		};

		watchId = navigator.geolocation.watchPosition(success, error, options);
	});
	onDestroy(() => {
		navigator.geolocation.clearWatch(watchId);
	});
</script>

<slot />
