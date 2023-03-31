<script>
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { stop_propagation } from 'svelte/internal';
	import { send, receive } from './transition.js';

	export let activity = { value: { stack: [], description: '' } };
	export let currentActSub = null; //{ response: { stack: [] } };
	/**
	 * @type {(arg0: { succeeded: boolean; response: any[]; }) => void}
	 */
	export let onSubmit;
	export let stack;
	export let pool;

	console.log('stack', stack, 'pool', pool);
	const POOLTYPE = 'pool';

	$: poolStack = [...stack, pool];
	$: console.log('poolstack', poolStack);

	let stackHover;

	function dragStart(event, stackIndexSrc, itemIndexSrc) {
		// Set the touch-action CSS property to 'none' on the draggable element
		// event.target.style.touchAction = 'none';

		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

		// // Create a new Image element and set it as the drag image
		// if (isIOS) {
		// 	const dragImage = new Image();
		// 	dragImage.src = '/drag.png';

		// 	// dragImage.style.transform = 'scale(1.5)';
		// 	// dragImage.style.width = '60px';
		// 	// dragImage.style.height = '40px';
		// 	event.dataTransfer.setDragImage(dragImage, event.offsetX, event.offsetY);
		// }

		// ...
		const data = { stackIndexSrc, itemIndexSrc };
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	function drop(event, targetStackIndex) {
		event.preventDefault();
		const json = event.dataTransfer.getData('text/plain');
		const data = JSON.parse(json);
		if (data.stackIndexSrc === targetStackIndex) return;
		// console.log('data', data, 'stackIndex', targetStackIndex);
		// console.log('st', stack, data.stackIndex, poolStack[data.stackIndex]);
		const subStackSrc = poolStack[data.stackIndexSrc];
		const item = subStackSrc.items[data.itemIndexSrc];
		const newSubStackItemsSrc = subStackSrc.items.filter(
			(/** @type {any} */ _, /** @type {number} */ i) => i !== data.itemIndexSrc
		);
		const newSubStackItemsTarget = [...poolStack[targetStackIndex].items, item];
		const newPoolStack = poolStack.map((s, i) => {
			if (i === targetStackIndex) {
				return { ...s, items: newSubStackItemsTarget };
			}
			if (i === data.stackIndexSrc) {
				return { ...s, items: newSubStackItemsSrc };
			}
			return s;
		});
		// const newStack = newPoolStack;
		console.log('new ', 'newSubStackItems', newPoolStack);
		console.log('newStack', newPoolStack);
		//TODO
		// poolStack[stackIndex].items.push(item);
		// RandomStack = RandomStack;

		const stack = newPoolStack.filter((d) => d.type !== POOLTYPE);
		const pool = newPoolStack.find((d) => d.type === POOLTYPE);
		onSubmit(stack, pool);
		stackHover = null;
	}

	let draggingItem = null;

	// onMount(() => {
	// 	function handleTouchStart(event) {
	// 		const touch = event.touches[0];
	// 		const offsetY = window.pageYOffset || window.scrollY;
	// 		const clientY = touch.clientY - offsetY;

	// 		// Create the drag image element and position it based on the adjusted touch coordinates
	// 		const dragImage = document.createElement('div');
	// 		dragImage.style.position = 'absolute';
	// 		dragImage.style.top = `${clientY}px`;
	// 		// ...

	// 		// Start the drag operation with the custom drag image
	// 		event.dataTransfer.setDragImage(dragImage, 0, 0);
	// 	}
	// 	document.addEventListener('dragstart', handleTouchStart);
	// });
	// $: console.log('poolStack', poolStack);
</script>

<div class="mb-3">
	<div class="label text-xl">Description:</div>
	<p class="text-lg">
		{activity?.description
			? value.description
			: 'Please drag and drop items to the corresponding categories'}
	</p>
</div>

<div class="flex-grow flex flex-col relative overflow-y-auto">
	{#if !!stack}
		{#each poolStack as s, i (s.name)}
			<div class="mb-3" animate:flip in:receive={{ key: i }} out:send={{ key: i }}>
				<h2 class="mb-2 text-lg">{s.name}</h2>
				<div
					class:pool={s.type === POOLTYPE}
					class:stack={s.type !== POOLTYPE}
					class="overflow-auto mb-3 flex  border-2 mx-2 z-50 items-center gap-2 p-2 "
					class:flex-wrap={s.type === POOLTYPE}
					class:stack-hover={stackHover === s.name &&
						s.type !== POOLTYPE &&
						!s.items.find((d) => d.id === draggingItem.id)}
					on:dragenter={(event) => {
						stackHover = s.name;
						event?.preventDefault();
					}}
					on:dragleave={(event) => {
						event?.preventDefault();
						stackHover = null;
					}}
					on:dragover={(event) => {
						event.preventDefault();
					}}
					on:drop={(event) => {
						console.log('drop', event);
						drop(event, i);
					}}
					ondragover="return false"
				>
					{#if s.items.length === 0}
						<div class="placeholder-text">Empty</div>
					{/if}
					{#each s.items as item, j (item.id)}
						<div
							draggable={true}
							on:dragstart={(event) => {
								draggingItem = item;
								console.log('start', event);
								dragStart(event, i, j);
							}}
							class="border-2 shrink-0 p-2 h-12 flex items-center justify-center"
							in:receive={{ key: j }}
							out:send={{ key: j }}
							animate:flip={{ duration: 500 }}
						>
							<div>
								{item.name}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.stack {
		height: 70px;
		@apply overflow-y-hidden;
	}
	.pool {
		/* height: 70px; */
		max-height: 200px;
		min-height: 100px;
		@apply flex-wrap;
	}
	.pool-hover {
		@apply border-4 border-dashed;
	}
	.stack-hover {
		@apply border-4 border-dashed;
	}
	.hovering {
		border-color: #454b1b;
		@apply border-4 border-dashed;
	}
	.item {
		display: inline; /* required for flip to work */
	}
	/* li {
		background-color: #00ffff;
		cursor: pointer;
		display: inline-block;
		margin-right: 10px;
		padding: 10px;
	} */
	li:hover {
		background: red;
		color: white;
	}
</style>
