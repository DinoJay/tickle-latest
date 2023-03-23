<script>
	import { flip } from 'svelte/animate';

	export let cls = '';
	export let style;

	export let flipped = false;
</script>

<div class="flip-card {cls}" {style}>
	<div
		class="flip-card-inner h-full w-full"
		style="transform:rotateY({flipped ? '180deg' : '0deg'}); "
	>
		<div class="flip-card-front h-full w-full z-0" style={flipped ? 'pointer-events:none' : ''}>
			<slot name="front" />
		</div>
		<div class="flip-card-back h-full w-full">
			<slot name="back" />
		</div>
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
		position: absolute;
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
