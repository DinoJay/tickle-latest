<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { addDoc, collection, updateDoc } from 'firebase/firestore';

	export let canvas;
	export let title = '';
	export let showPicture = false;
	export let onClick = () => {};
	export let activityDone = () => {};
</script>

<div class="flex flex-col h-full w-full bg-white absolute {showPicture ? 'visible' : 'invisible'}">
	<h1 class="text-xl mb-2 p-2">{title}</h1>
	<canvas bind:this={canvas} class="mx-auto mt-[5%] mb-auto h-auto w-auto" />
	<div class="flex h-full w-full text-4xl">
		<button
			class="m-auto h-12 w-12
				text-c-green hover:scale-110"
			on:click={() => {
				const value = {
					img: canvas.toDataURL('image/jpeg'),
					title
				};
			}}
		>
			✓
		</button>
		<button
			class="m-auto h-12 w-12
				text-red-500 hover:scale-110"
			on:click={() => onClick()}
		>
			x
		</button>
	</div>
</div>
