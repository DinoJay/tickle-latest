<script>
	import Camera from 'svelte-material-icons/Camera.svelte';
	/**
	 * @type {(arg0: string) => void}
	 */
	export let onChange;
	/**
	 * @type {HTMLVideoElement}
	 */
	let video;
	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;
	let noSupportCam = false;
	let imgTaken = false;

	const setupCamera = async () => {
		if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
			console.log("Let's get this party started");

			const constraints = {
				video: true
			};

			try {
				const videoStream = await navigator.mediaDevices.getUserMedia(constraints);
				video.srcObject = videoStream;
			} catch (e) {
				console.error(e);
				noSupportCam = true;
			}
		}
	};

	const makeImg = () => {
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		canvas.getContext('2d')?.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
		imgTaken = true;
	};
	setupCamera();
</script>

<div class="relative flex-grow flex flex-col">
	<canvas bind:this={canvas} class="absolute left-0 top-0" />
	<div class="flex mt-3 flex-grow flex flex-col">
		{#if !noSupportCam}
			<video class="flex-grow " bind:this={video} autoplay>
				<track kind="captions" />
			</video>
		{:else}
			<p class="m-auto">Environment camera is not available.</p>
		{/if}
	</div>
</div>

<button class="flex justify-center items-center w-full mt-auto text-xl" on:click={makeImg}>
	<span class="">Take a photo</span>
	<span class="ml-3"><Camera /></span>
</button>
{#if imgTaken}
	<div class="flex h-full w-full text-4xl">
		<button
			class=""
			on:click={() => {
				onChange(canvas.toDataURL('image/jpeg'));
			}}
		>
			✓
		</button>
		<button class="" on:click={() => onClick()}> x </button>
	</div>
{/if}
