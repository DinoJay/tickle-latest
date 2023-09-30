<script>
	import Description from './../../../Card/Description.svelte';
	import { store } from '/src/stores/index';
	import RadiusMap from '../../../Map/RadiusMap.svelte';

	const radians = [10, 50, 100, 200];

	export let value = { title: null, description: null, location: undefined, radius: radians[0] };
	/**
	 * @type {(arg0: { location: { lon: any; lat: any; } | null; title: any; description: any; radius:number}) => void}
	 */
	export let onChange;
	export let onClose;

	$: console.log('value', value);

	const defaultLoc = [4.30566702865358, 50.8862008375488];

	$: userLocation = $store.currentUser?.location
		? { lon: $store.currentUser.location.longitude, lat: $store.currentUser.location.latitude }
		: { lon: defaultLoc[0], lat: defaultLoc[1] };

	$: location = value?.location || userLocation;
	$: radius = value?.radius || radians[0];
	$: title = value?.title || null;
	$: description = value?.description || null;

	$: curVal = { location, radius, title, description };
</script>

<RadiusMap
	{location}
	radiusInM={radius}
	onChange={(lon, lat) => {
		onChange({ ...curVal, location: { lon, lat } });
	}}
/>

<div class="mt-3 mb-3">
	<div class="label">Radius:</div>
	<select
		class=" p-1 border-2 w-full"
		name="radius"
		id="radius"
		on:change={(e) => {
			onChange({ ...curVal, radius: +e.target.value });
		}}
	>
		{#each radians as r}
			<option selected={r === radius} value={r}>{r}m</option>
		{/each}
	</select>
</div>
<div class="mt-3 mb-3">
	<div class="label">Title:</div>
	<input
		placeholder="Enter title"
		value={title}
		class="border-2 p-2 w-full"
		on:input={(e) => onChange({ ...curVal, title: e.target.value })}
	/>
</div>
<div>
	<div class="label">Description:</div>
	<textarea
		placeholder="Enter description"
		style="height:10rem"
		value={description}
		class="border-2 p-2 w-full"
		on:input={(e) => onChange({ ...curVal, description: e.target.value })}
	/>
</div>
