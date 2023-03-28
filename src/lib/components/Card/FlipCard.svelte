<script>
	import { transition } from 'd3-transition';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let cls = '';
	export let style;
	export let flipped = false;

	const duration = 500;
	const rotateY = (degrees) => `rotateY(${degrees}deg)`;

	const frontRotation = tweened(0, { duration });
	const backRotation = tweened(180, { duration });

	$: frontRotation.set(flipped ? -180 : 0);
	$: backRotation.set(flipped ? 0 : 180);
</script>

<div class="card {cls} {flipped ? 'flipped' : ''}" {style}>
	<div class="front" style="transform: {rotateY($frontRotation)};">
		<slot name="front" />
	</div>
	<div class="back" style="transform: {rotateY($backRotation)};">
		<slot name="back" />
	</div>
</div>

<style>
	.card {
		width: 100%;
		height: 100%;
		position: relative;
		perspective: 800px;
	}
	.front,
	.back {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		/* display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2em; */
	}
	.front {
		/* background-color: #f7f7f7; */
		z-index: 2;
	}
	.back {
		/* background-color: #d8d8d8; */
		transform: rotateY(180deg);
	}
	.flipped .back {
		z-index: 2;
		transform: rotateY(0deg);
	}
	.flipped .front {
		transform: rotateY(-180deg);
	}
</style>
