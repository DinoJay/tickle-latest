<script>
	import Camera from 'svelte-material-icons/Camera.svelte';
	import Check from 'svelte-material-icons/Check.svelte';

	import { ref, uploadString, getDownloadURL } from 'firebase/storage';
	import { storage } from '$lib/firebaseConfig/firebase';
	import { v4 as uuidv4 } from 'uuid';

	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	/**
	 * @type {(arg0: string) => void}
	 */
	export let onChange;
	export let imgUrl;
	/**
	 * @type {HTMLVideoElement}
	 */
	let video;
	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;
	let noSupportCam = false;
	let curImg = false;
	let uploading = false;

	const setupCamera = async () => {
		if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
			const constraints = {
				video: {
					width: 1000,
					height: 1280,
					facingMode: 'environment'
				}
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
		canvas.width = video.clientWidth;
		canvas.height = video.clientHeight;
		canvas.getContext('2d')?.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
		curImg = true;
	};
	setupCamera();
</script>

<div class="relative  flex  items-center  mb-3">
	<canvas bind:this={canvas} class="absolute left-0 top-0 pointer-events-none" />
	<div class="flex flex flex-col w-full">
		{#if !noSupportCam}
			{#if !!imgUrl}
				<img class="flex-grow object-cover" src={imgUrl} alt="current Img" />
			{/if}
			<video class={!!imgUrl ? 'hidden' : 'mx-auto'} bind:this={video} autoplay>
				<track kind="captions" />
			</video>
		{:else}
			<p class="m-auto">Environment camera is not available.</p>
		{/if}

		<div class="mt-3">
			<!-- {#if !imgApproved} -->
			{#if !imgUrl && !curImg}
				<button
					class=" create-btn flex justify-center items-center w-full mt-auto text-xl"
					on:click={makeImg}
				>
					<span class="">Take a photo</span>
					<span class="ml-3"><Camera /></span>
				</button>
			{/if}
			{#if !!imgUrl}
				<button
					class="del-btn flex-grow w-full flex justify-center text-xl {uploading ? 'disabled' : ''}"
					disabled={uploading}
					on:click={() => {
						// imgTaken = false;
						onChange(null);
						canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
					}}
				>
					{#if uploading}
						<span> Uploading... </span>
					{:else}
						<span>Remove Photo</span>
					{/if}
				</button>
			{/if}
			{#if curImg}
				<div class="flex h-full w-full ">
					<button
						class="create-btn flex-grow {!uploading ? 'mr-2' : ''} flex justify-center"
						disabled={uploading}
						on:click={() => {
							const dataUrl = canvas.toDataURL('image/jpeg');

							const storageRef = ref(storage, uuidv4());
							uploading = true;
							onChange(dataUrl);

							curImg = false;
							// curImg = false;
							// uploading = false;
							uploadString(storageRef, dataUrl, 'data_url').then((snapshot) => {
								getDownloadURL(snapshot.ref).then((downloadURL) => {
									console.log('downloadUrl', downloadURL);
									// loading = false;
									onChange(downloadURL);
									// curImg = false;
									uploading = false;
								});
							});
							// imgTaken = false;
						}}
					>
						<Check size={28} />
					</button>
					{#if !uploading}
						<button
							class="del-btn flex-grow flex justify-center"
							on:click={() => {
								curImg = false;
								onChange(null);
								canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
							}}
						>
							<WindowClose size={28} />
						</button>
					{/if}
				</div>
				<!-- {/if} -->

				<!-- {:else}
				<button class="create-btn w-full text-xl" on:click={() => (imgApproved = false)}
					>Photo done!</button
				> -->
			{/if}
		</div>
	</div>
</div>
