<script>
	import { store } from '/src/stores/index';
	import RadiusMap from '../../../Map/RadiusMap.svelte';

	const radians = [10, 50, 100, 200];

	export let value = { title: null, description: null, location: null, radius: radians[0] };
	/**
	 * @type {(arg0: { location: { lon: any; lat: any; } | null; title: any; description: any; radius:number}) => void}
	 */
	export let onChange;

	$: console.log('value', value);

	const defaultLoc = [4.30566702865358, 50.8862008375488];

	$: userLocation = $store.currentUser?.location
		? { lon: $store.currentUser.location.longitude, lat: $store.currentUser.location.latitude }
		: { lon: defaultLoc[0], lat: defaultLoc[1] };
</script>

<div>
	<RadiusMap
		location={value?.location || userLocation}
		radiusInM={value?.radius}
		onChange={(lon, lat) => {
			onChange({ ...value, location: { lon, lat } });
		}}
	/>

	<div class="mt-3 mb-3">
		<div class="label">Radius:</div>
		<select
			class=" p-1 border-2 w-full"
			name="radius"
			id="radius"
			on:change={(e) => {
				onChange({ ...value, radius: +e.target.value });
			}}
		>
			{#each radians as r}
				<option selected={r === value.radius} value={r}>{r}m</option>
			{/each}
		</select>
	</div>
	<div class="mt-3 mb-3">
		<div class="label">Title:</div>
		<input
			placeholder="Enter title"
			value={value.title}
			class="border-2 p-2 w-full"
			on:input={(e) => onChange({ ...value, title: e.target.value })}
		/>
	</div>
	<div>
		<div class="label">Description:</div>
		<textarea
			placeholder="Enter description"
			style="height:10rem"
			value={value.description}
			class="border-2 p-2 w-full"
			on:input={(e) => onChange({ ...value, description: e.target.value })}
		/>
	</div>
</div>
