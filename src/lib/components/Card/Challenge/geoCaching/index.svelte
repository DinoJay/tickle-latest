<script>
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import PhotoCam from './PhotoCam.svelte';

	import Camera from 'svelte-material-icons/Camera.svelte';

	/**
	 * @type {string}
	 */
	export let title;
	export let description;

	export let activity = { value: { title: null, description: null } };

	let activityDone = false;

	let makingPhoto = false;

	// $: console.log('props', $$props);

	// navigator.mediaDevices
	// 	.getUserMedia({
	// 		video: {
	// 			facingMode: { exact: 'environment' }
	// 		},
	// 		audio: false
	// 	})
	// 	.then((stream) => {
	// 		videoSrc.srcObject = stream;
	// 	})
	// 	.catch((e) => {
	// 		isCameraWorking = false;
	// 	});
</script>

<div class="flex flex-col">
	<h1 class="text-xl mb-2 p-2">{activity.value?.title}</h1>
	<p>{activity.value?.description}</p>

	<button
		class="flex justify-center items-center w-full mt-auto text-xl"
		on:click={() => (makingPhoto = true)}
	>
		<span class="">Take a photo</span>
		<span class="ml-3"><Camera /></span>
	</button>
</div>

<LightBox title="Take photo" isOpen={makingPhoto} close={() => (makingPhoto = false)}>
	<PhotoCam onChange={(imgSrc) => console.log('img', imgSrc)} />
</LightBox>
