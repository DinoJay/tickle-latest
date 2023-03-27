<script>
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	export let cls = '';
	export let style;

	export let flipped = false;

	const ios = () => {
		if (typeof window === `undefined` || typeof navigator === `undefined`) return false;

		return /iPhone|iPad|iPod/i.test(
			navigator.userAgent ||
				navigator.vendor ||
				(window.opera && opera.toString() === `[object Opera]`)
		);
	};

	beforeUpdate(() => {
		if (ios()) {
			document.querySelector('.flip-card-front')?.classList.remove('hidden');
			document.querySelector('.flip-card-back')?.classList.remove('hidden');
		}
	});

	// ios fix hack
	afterUpdate(() => {
		// console.log('flipcard', flipped);
		// setTimeout(() => {
		// if (ios()) {
		// 	if (flipped) {
		// 		// document.querySelector('.flip-card-back')?.classList.remove('z-0');
		// 		// document.querySelector('.flip-card-back')?.classList.remove('absolute');
		// 		// document.querySelector('.flip-card-front')?.classList.add('absolute');
		// 		// document.querySelector('.flip-card-front')?.classList.add('z-0');
		// 		setTimeout(() => {
		// 			document.querySelector('.flip-card-front')?.classList.add('z-0');
		// 		}, 1000);
		// 	} else {
		// 		setTimeout(() => {
		// 			document.querySelector('.flip-card-front')?.classList.remove('z-0');
		// 			document.querySelector('.flip-card-back')?.classList.add('z-0');
		// 			document.querySelector('.flip-card-front')?.classList.remove('absolute');
		// 			document.querySelector('.flip-card-back')?.classList.add('absolute');
		// 		}, 600);
		// 		setTimeout(() => {
		// 			document.querySelector('.flip-card-front')?.classList.remove('hidden');
		// 			document.querySelector('.flip-card-back')?.classList.add('hidden');
		// 		}, 500);
		// 	}
		// } else {
		// 	// document.querySelector('.flip-card-back')?.classList.add('left-0');
		// 	// document.querySelector('.flip-card-back')?.classList.add('top-0');
		// }
	});
</script>

<div class="flip-card {cls}" {style}>
	<div class="flip-card-inner h-full w-full">
		{#if flipped}
			<div in:fade={{ duration: 1000 }} out:fade class=" h-full w-full ">
				<slot name="back" />
			</div>
		{:else}
			<div in:fade={{ duration: 1000 }} out:fade class=" h-full w-full ">
				<slot name="front" />
			</div>
		{/if}
	</div>
</div>

<style>
	/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
	.flip-card {
		background-color: transparent;
		/* width: 300px;
		height: 200px; */
		/* border: 1px solid #f1f1f1; */
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}

	/* This container is needed to position the front and back side */
	.flip-card-inner {
		position: relative;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	/* Do an horizontal flip when you move the mouse over the flip box container */
	/* .flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	} */

	/* Position the front and back side */
	.flip-card-front,
	.flip-card-back {
		/* position: absolute; */
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}

	/* Style the front side (fallback if image is missing) */
	.flip-card-front {
		/* background-color: #bbb; */
		/* color: black; */
	}

	/* Style the back side */
	.flip-card-back {
		/* background-color: dodgerblue; */
		/* color: white; */
		transform: rotateY(180deg);
	}
</style>
