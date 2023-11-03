<script>
	import { transition } from 'd3-transition';
	import interact from 'interactjs';
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card/Card.svelte';

	import { fade, fly } from 'svelte/transition';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let cards;
	export let selectedEnv;
	const interactThreshold = 100;
	const interactMaxRotation = 15;
	let rotation = 0;
	let x = 0;
	let y = 0;

	// const cards = writable([]);

	// track which tab is active

	// create a context called "tabs" to share the store with children
	// setContext('swipeableCards', { cards });

	// // update the tabs store whenever the active index changes
	// // it will cause children to update since they are subscribed to the store
	// $: $cards = $cards.map((c, i) => {
	// 	return {
	// 		...c,
	// 		offset: i * 5
	// 	};
	// });

	// // https://hankchizljaw.com/wrote/get-css-custom-property-value-with-javascript/#heading-the-getcsscustomprop-function
	// const getCSSCustomProp = (propKey, element = document.documentElement, castAs = 'string') => {
	// 	let response = getComputedStyle(element).getPropertyValue(propKey);
	// 	// Tidy up the string if there's something to work with
	// 	if (response.length) {
	// 		response = response.replace(/\'|"/g, '').trim();
	// 	}
	// 	// Convert the response into a whatever type we wanted
	// 	switch (castAs) {
	// 		case 'number':
	// 		case 'int':
	// 			return parseInt(response, 10);
	// 		case 'float':
	// 			return parseFloat(response, 10);
	// 		case 'boolean':
	// 		case 'bool':
	// 			return response === 'true' || response === '1';
	// 	}
	// 	// Return the string response by default
	// 	return response;
	// };
	// function dragMoveListener(event) {
	// 	var target = event.target;
	// 	// keep the dragged position in the custom properties
	// 	x = (getCSSCustomProp('--card-x', target, 'float') || 0) + event.dx;
	// 	y = (getCSSCustomProp('--card-y', target, 'float') || 0) + event.dy;
	// 	// add rotation based on card position
	// 	rotation = interactMaxRotation * (x / interactThreshold);
	// 	if (rotation > interactMaxRotation) rotation = interactMaxRotation;
	// 	else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;
	// 	// console.log('rotation', rotation);
	// 	// update styles
	// 	target.style.setProperty('--card-x', x + 'px');
	// 	target.style.setProperty('--card-y', y + 'px');
	// 	// target.style.setProperty('--card-r', rotation + 'deg');

	// 	target.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

	// 	const vw = document.documentElement.clientWidth;
	// 	const vh = document.documentElement.clientHeight;
	// 	if (rotation === interactMaxRotation) {
	// 		console.log('remove card');
	// 		target.style.transform = `translate(${vw + 300}px, ${vh / 2 - 200}px) rotate(${rotation}deg)`;
	// 		target.style.transition = 'transform 0.5s ease-in-out';
	// 		rotation = 0;
	// 	}
	// }
	// onMount(() => {
	// 	// get viewport width
	// 	const vw = document.documentElement.clientWidth;
	// 	// create an off canvas x coordinate
	// 	let offX = 400;
	// 	if (vw > 400) {
	// 		offX = vw;
	// 	}
	// 	// interact.js
	// 	interact('.card').draggable({
	// 		startAxis: 'x',
	// 		lockAxis: 'x',
	// 		onstart: (event) => {
	// 			console.log('dragging');
	// 			// signify dragging
	// 			event.target.setAttribute('data-dragging', true);
	// 		},
	// 		// call this function on every dragmove event
	// 		onmove: dragMoveListener,
	// 		onend: (event) => {
	// 			console.log('dragend');
	// 			var target = event.target;
	// 			if (rotation < interactMaxRotation) {
	// 				console.log('reset', rotation);
	// 				target.style.setProperty('--card-x', 0 + 'px');
	// 				target.style.setProperty('--card-y', 0 + 'px');
	// 				target.style.transform = `translate(${0}px, ${0}px) rotate(${0}deg)`;
	// 				target.style.transition = 'transform 0.2s ease-in-out';
	// 				// rotation = 0;
	// 			}
	// 		}
	// 		// call this function on every dragend event
	// 		// onend: (event) => {
	// 		// 	// signify dragging stopped
	// 		// 	event.target.setAttribute('data-dragging', false);
	// 		// 	// calculate how far card moved
	// 		// 	let moved = Math.sqrt(
	// 		// 		(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2)) | 0
	// 		// 	);
	// 		// 	if (rotation === interactMaxRotation) {
	// 		// 		console.log('remove card');
	// 		// 	}
	// 		// 	if (moved > interactThreshold) {
	// 		// 		console.log('remove card');
	// 		// 		// remove card
	// 		// 		event.target.setAttribute('data-status', 'transition');
	// 		// 		if (x > 0) {
	// 		// 			x = offX;
	// 		// 		} else {
	// 		// 			x = offX * -1;
	// 		// 		}
	// 		// 		// mark as done after CSS transition
	// 		// 		event.target.addEventListener('transitionend', () => {
	// 		// 			event.target.setAttribute('data-status', 'done');
	// 		// 		});
	// 		// 		// activate next card
	// 		// 		event.target.nextElementSibling.setAttribute('data-status', 'current');
	// 		// 	} else {
	// 		// 		// reset vars
	// 		// 		x = 0;
	// 		// 		y = 0;
	// 		// 		rotation = 0;
	// 		// 		// update rotation
	// 		// 		event.target.style.setProperty('--card-r', rotation + 'deg');
	// 		// 	}
	// 		// 	// update x and y pos
	// 		// 	event.target.style.setProperty('--card-x', x + 'px');
	// 		// 	event.target.style.setProperty('--card-y', y + 'px');
	// 		// }
	// 	});
	// });
	let selIndex = 0;
	$: selCard = cards[selIndex];
</script>

<div class="w-full h-full flex flex-col relative">
	<div class="mx-auto h-full w-full flex flex-col" style:max-width="450px">
		<div class="flex-none w-full h-full flex flex-col">
			{#key selIndex}
				<div class="flex-grow flex" in:fly={{ x: -600, y: 0 }} out:fly={{ x: 600, y: 0 }}>
					<Card
						cls="flex-grow"
						{...selCard}
						langs={selectedEnv.langs}
						selectedEnvId={selectedEnv.id}
						onClose={() => {
							//TODO: wrong fix that
							// selectedCardId = null;
						}}
					/>
				</div>
			{/key}
			<div class="flex">
				<button class="btn" on:click={() => (selIndex = selIndex - 1)}>prev</button>
				<button class="btn" on:click={() => (selIndex = selIndex + 1)}>next</button>
			</div>
		</div>
	</div>
</div>
