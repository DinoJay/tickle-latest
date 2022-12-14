<script>
	import { store } from '/src/stores/index';
	import { ref, uploadString, getDownloadURL } from 'firebase/storage';
	import { storage } from '$lib/firebaseConfig/firebase';
	import { v4 as uuidv4 } from 'uuid';
	/**
	 * @type {null}
	 */
	export let url = null;
	export let onChange = (/** @type {string} */ e, /** @type {string} */ _fname) => undefined;
	/**
	 * @type {HTMLInputElement}
	 */
	let fileInput;
	/**
	 * Read the file upload and convert it to a picture
	 * @param e - event
	 */
	const onCompressed = (e, onLoad) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			const img = new Image();
			img.src = e.target.result;
			img.onload = () => {
				let ratio = img.naturalHeight / 100000;
				ratio = ratio.toFixed(0);
				if (ratio == 0) ratio = 1;
				const elem = document.createElement('canvas');
				elem.height = img.naturalHeight / ratio;
				elem.width = img.naturalWidth / ratio;
				const ctx = elem.getContext('2d');
				ctx.drawImage(img, 0, 0, elem.width, elem.height);
				const url = elem.toDataURL('image/jpeg', 0.1);
				onLoad(url);
				// console.log('elem', elem, url);
			};
		};
	};
	let loading = false;
</script>

<div class="">
	<div
		class="mb-3"
		on:keydown={() => null}
		on:click={() => {
			console.log('click', fileInput);
		}}
	>
		{#if loading}
			<div style="height:200px" class="flex text-c-gray w-full border">
				<div class="italic m-auto">Loading...</div>
			</div>
		{/if}
		{#if !!url && !loading}
			<img
				style="height:200px"
				class="m-auto w-full max-w-full object-cover "
				src={url}
				alt={url}
			/>
		{/if}
		{#if !loading && !url}
			<div style="height:200px" class="flex text-c-gray cursor-pointer border">
				<div class="italic m-auto">No image found</div>
			</div>
		{/if}
	</div>
	<input
		type="file"
		class="file"
		name="picture"
		id="pictureFile"
		bind:this={fileInput}
		on:change={(e) => {
			const fname = e.target?.value?.replace(/.*\\/, '');
			const file = e.target?.files;
			loading = true;
			const storageRef = ref(storage, `${fname}|${uuidv4()}`);
			console.log('storage ref fname', fname);
			onCompressed(e, (/** @type {string} */ dataUrl) => {
				uploadString(storageRef, dataUrl, 'data_url').then((snapshot) => {
					getDownloadURL(snapshot.ref).then((downloadURL) => {
						console.log('downloadUrl', downloadURL);
						loading = false;
						onChange(downloadURL, fname);
					});
				});
			});
		}}
	/>
</div>

<style>
	.file {
		@apply w-full;
	}
</style>
