<script>
	import Activity from '../Activity.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import PhotoCam from './PhotoCam.svelte';

	import Camera from 'svelte-material-icons/Camera.svelte';
	import RadiusMap from '$lib/components/Map/RadiusMap.svelte';
	import { locale } from 'svelte-i18n';
	import { activityValueLocales } from '$lib/constants/locales';

	/**
	 * @type {(arg0: { imgUrl?: string; answer?: any; }) => void}
	 */
	export let onSubmit;

	export let activity = {
		value: { title: null, description: null, radius: 0, location: { lat: 0, lon: 0 } }
	};

	/**
	 * @type {{ answer: string|null; imgUrl: string|null; }}}
	 */
	export let userResponse = { answer: null, imgUrl: null };

	/**
	 * @type {string}
	 */
	export let actValAcc;

	// let activityDone = false;

	let makingPhoto = false;

	$: value = activity[actValAcc];
</script>

<!-- <h1 class="text-xl mb-2 p-2">{activity.value?.title}</h1> -->

<div class="flex-grow mb-3" style="max-height: 20rem">
	<RadiusMap radiusInM={value.radius} location={value?.location} />
</div>
<p>{value?.description}</p>

<button
	class="create-btn mt-auto flex justify-center items-center w-full mt-auto text-xl"
	on:click={() => (makingPhoto = true)}
>
	<span class="">Submit Response</span>
	<span class="ml-3"><Camera /></span>
</button>

<LightBox title="Take photo" isOpen={makingPhoto} close={() => (makingPhoto = false)}>
	<PhotoCam imgUrl={userResponse.imgUrl} onChange={(imgUrl) => onSubmit({ imgUrl })} />
	<textarea
		placeholder="Enter your Answer"
		value={userResponse?.answer || ''}
		class="text-area flex-grow shrink-0"
		on:change={(e) => onSubmit({ answer: e.target?.value })}
	/>
	<button on:click={() => (makingPhoto = false)} class="create-btn mt-3">Submit Response</button>
</LightBox>
