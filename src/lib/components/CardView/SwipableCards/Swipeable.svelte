<script>
	import interact from 'interactjs';
	import { onMount } from 'svelte';
	const interactThreshold = 100;
	const interactMaxRotation = 15;
	let rotation = 0;
	let x = 0;
	let y = 0;
	// https://hankchizljaw.com/wrote/get-css-custom-property-value-with-javascript/#heading-the-getcsscustomprop-function
	const getCSSCustomProp = (propKey, element = document.documentElement, castAs = 'string') => {
		let response = getComputedStyle(element).getPropertyValue(propKey);
		// Tidy up the string if there's something to work with
		if (response.length) {
			response = response.replace(/\'|"/g, '').trim();
		}
		// Convert the response into a whatever type we wanted
		switch (castAs) {
			case 'number':
			case 'int':
				return parseInt(response, 10);
			case 'float':
				return parseFloat(response, 10);
			case 'boolean':
			case 'bool':
				return response === 'true' || response === '1';
		}
		// Return the string response by default
		return response;
	};
	function dragMoveListener(event) {
		var target = event.target;
		// keep the dragged position in the custom properties
		x = (getCSSCustomProp('--card-x', target, 'float') || 0) + event.dx;
		y = (getCSSCustomProp('--card-y', target, 'float') || 0) + event.dy;
		// add rotation based on card position
		rotation = interactMaxRotation * (x / interactThreshold);
		if (rotation > interactMaxRotation) rotation = interactMaxRotation;
		else if (rotation < -interactMaxRotation) rotation = -interactMaxRotation;
		// update styles
		target.style.setProperty('--card-x', x + 'px');
		target.style.setProperty('--card-y', y + 'px');
		target.style.setProperty('--card-r', rotation + 'deg');
	}
	onMount(() => {
		// get viewport width
		const vw = document.documentElement.clientWidth;
		// create an off canvas x coordinate
		let offX = 400;
		if (vw > 400) {
			offX = vw;
		}
		// interact.js
		interact('.card[data-status="current"]:not(:last-child)').draggable({
			onstart: () => {
				// signify dragging
				event.target.setAttribute('data-dragging', true);
			},
			// call this function on every dragmove event
			onmove: dragMoveListener,
			// call this function on every dragend event
			onend: (event) => {
				// signify dragging stopped
				event.target.setAttribute('data-dragging', false);
				// calculate how far card moved
				let moved = Math.sqrt(
					(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2)) | 0
				);
				if (moved > interactThreshold) {
					// remove card
					event.target.setAttribute('data-status', 'transition');
					if (x > 0) {
						x = offX;
					} else {
						x = offX * -1;
					}
					// mark as done after CSS transition
					event.target.addEventListener('transitionend', () => {
						event.target.setAttribute('data-status', 'done');
					});
					// activate next card
					event.target.nextElementSibling.setAttribute('data-status', 'current');
				} else {
					// reset vars
					x = 0;
					y = 0;
					rotation = 0;
					// update rotation
					event.target.style.setProperty('--card-r', rotation + 'deg');
				}
				// update x and y pos
				event.target.style.setProperty('--card-x', x + 'px');
				event.target.style.setProperty('--card-y', y + 'px');
			}
		});
	});
</script>

<main class="container relative">
	<slot />
</main>
