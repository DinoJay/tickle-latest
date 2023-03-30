<script>
	import { transition } from 'd3-transition';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	// import { fly } from 'svelte/transition';

	export let cls = '';
	export let style;
	export let flipped = false;

	const duration = 500;
	const rotateY = (degrees) => `rotateY(${degrees}deg)`;

	const frontRotation = tweened(0, { duration });
	const backRotation = tweened(180, { duration });

	$: frontRotation.set(flipped ? -180 : 0);
	$: backRotation.set(flipped ? 0 : 180);
	function split_css_unit(value) {
		const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
		return split ? [parseFloat(split[1]), split[2] || 'px'] : [value, 'px'];
	}
	function fly(
		node,
		{ delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}
	) {
		const style = getComputedStyle(node);
		const target_opacity = +style.opacity;
		const transform = style.transform === 'none' ? '' : style.transform;

		const od = target_opacity * (1 - opacity);
		const [xValue, xUnit] = split_css_unit(x);
		const [yValue, yUnit] = split_css_unit(y);
		return {
			delay,
			duration,
			easing,
			css: (t, u) =>
				`transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${
					(1 - t) * yValue
				}${yUnit});`
			// tick: (t, u) => {
			// 	const st = `${transform} translate(${(1 - t) * xValue}${xUnit}, ${
			// 		(1 - t) * yValue
			// 	}${yUnit});`;
			// 	console.log('st', st);
			// 	// node.style.transform = st;
			// 	node.style['background'] = 'red';
			// }
		};
	}
</script>

<div
	in:fly={{ y: 800 }}
	out:fly={{ y: 800, duration: 600 }}
	class="card {cls} {flipped ? 'flipped' : ''}"
	{style}
>
	<div class="front" style="transform: {rotateY($frontRotation)};">
		<slot name="front" />
	</div>
	<div class="back" style="transform: {rotateY($backRotation)};">
		<slot name="back" />
	</div>
</div>

<style>
	.card {
		/* width: 100%;
		height: 100%; */
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
