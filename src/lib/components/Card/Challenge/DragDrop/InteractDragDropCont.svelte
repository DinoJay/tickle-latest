<script>
	import { langDict } from './../../../../../stores/localizationStore.js';
	import { flip } from 'svelte/animate';
	import { send, receive } from './transition.js';
	import { onMount } from 'svelte';
	import interact from 'interactjs';

	export let activity = { value: { stack: [], description: '' } };
	export let currentActSub = null; //{ response: { stack: [] } };
	export let onSubmit;
	export let stack;
	export let pool;
	export let succeeded;

	const POOLTYPE = 'pool';

	$: poolStack = [...stack, pool];

	let stackHover;

	let draggingItem = null;
	// let data;

	let cont;

	const data = {
		stackSrcId: 0,
		itemSrcId: 0
	};

	const drop = (stackTargetId) => {
		console.log('data', data);
		if (data.stackSrcId === stackTargetId) return;

		console.log('poolStack', poolStack);
		const subStackSrc = poolStack.find((d) => d.id === data.stackSrcId);
		const item = subStackSrc.items.find((d) => d.id === data.itemSrcId);
		// if (item === undefined) return;
		const newSubStackItemsSrc = subStackSrc.items.filter(
			(/** @type {any} */ d, /** @type {number} */ i) => d.id !== data.itemSrcId
		);
		const newSubStackItemsTarget = [...poolStack.find((d) => d.id === stackTargetId).items, item];

		const newPoolStack = poolStack.map((s, i) => {
			if (s.id === stackTargetId) {
				return { ...s, items: newSubStackItemsTarget };
			}
			if (s.id === data.stackSrcId) {
				return { ...s, items: newSubStackItemsSrc };
			}
			return s;
		});
		console.log('newPoolStack', newPoolStack);
		// const newStack = newPoolStack;
		// console.log('new ', 'newSubStackItems', newPoolStack);
		// console.log('newStack', newPoolStack);
		//TODO
		// poolStack[stackIndex].items.push(item);
		// RandomStack = RandomStack;

		const stack = newPoolStack.filter((d) => d.type !== POOLTYPE);
		const pool = newPoolStack.find((d) => d.type === POOLTYPE);
		onSubmit(stack, pool);
		stackHover = null;
	};

	const dropZone = (node, { stackTargetId, name }) => {
		interact(node).dropzone({
			overlap: 0.75,
			ondragenter: function (event) {
				stackHover = name;
			},
			ondragleave: function (event) {
				stackHover = null;
			},
			ondrop: function (event) {
				drop(stackTargetId);
			}
		});
	};

	function dragMoveListener(event) {
		var target = event.target;
		var x = parseFloat(target.getAttribute('data-x')) + event.dx;
		var y = parseFloat(target.getAttribute('data-y')) + event.dy;

		target.style.top = y + 'px';
		target.style.left = x + 'px';
		target.style.position = 'absolute';

		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}

	const dragItem = (node, { stackSrcId, itemSrcId, item }) => {
		interact(node).draggable({
			inertia: true,
			listeners: {
				move: dragMoveListener,
				ondragstart: (event) => {
					console.log('dragstart', event);
				},
				end(event) {
					draggingItem = null;

					// console.log('pos', event.target.style.position);
					// console.log('trans', event.target.style.transform);

					event.target.style.position = null;
					event.target.style.left = null;
					event.target.style.top = null;

					event.target.setAttribute('data-x', null);
					event.target.setAttribute('data-y', null);
				},
				start() {
					data.itemSrcId = itemSrcId;
					data.stackSrcId = stackSrcId;
				}
			},
			// modifiers: [
			// 	interact.modifiers.restrictRect({
			// 		restriction: cont,
			// 		endOnly: true
			// 	})
			// ],
			onstart(event) {
				let target = event.target;
				let rect = target.getBoundingClientRect();
				// target.style.position = 'absolute';
				// target.style.top = position.top + 'px';
				console.log('event', event);
				draggingItem = item;

				target.setAttribute('data-x', rect.x);
				target.setAttribute('data-y', rect.y);
			},
			autoScroll: true,
			maxPerElement: 1
			// dragMoveListener from the dragging demo above
		});
	};
</script>

<div class="mb-3">
	<div class="label text-xl">{$langDict.descr_title}:</div>
	<p class="text-lg">
		{activity?.description ? value.description : $langDict.dragdrop.description}
	</p>
</div>

<div bind:this={cont} class="flex-grow flex flex-col overflow-y-auto">
	{#if stack !== undefined}
		<div class="flex-grow overflow-y-auto">
			{#each stack as s, i (s.name)}
				<div class="mb-3 dragzone" animate:flip in:receive={{ key: i }} out:send={{ key: i }}>
					<h2 class="mb-2 text-lg">{s.name}</h2>
					<div
						class="stack overflow-auto mb-3 flex border-2 mx-2 items-center gap-2 p-2"
						class:flex-wrap={s.type === POOLTYPE}
						class:stack-hover={stackHover === s.name &&
							!s.items.find((d) => d.id === draggingItem?.id)}
						use:dropZone={{ stackTargetId: s.id, name: s.name }}
					>
						{#if s.items.length === 0}
							<div class="placeholder-text">{$langDict.dragdrop.empty}</div>
						{/if}
						{#each s.items as item, j (item.id)}
							<div
								use:dragItem={{ stackSrcId: s.id, itemSrcId: item.id, item }}
								in:receive={{ key: j }}
								out:send={{ key: j }}
								animate:flip={{ duration: 500 }}
								class="border-2 shrink-0 p-2 h-12 flex items-center justify-center"
							>
								<div>
									{item.name}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="mb-3 dragzone">
			<h2 class="mb-2 text-xl label">{pool.name}</h2>
			<div
				class="pool flex-wrap overflow-auto mb-3 flex border-2 items-center gap-2 p-2"
				class:stack-hover={stackHover === pool.name &&
					!pool.items.find((d) => d.id === draggingItem?.id)}
				use:dropZone={{ stackTargetId: pool.id, name: pool.name }}
			>
				{#if pool.items.length === 0}
					<div class="placeholder-text">{$langDict.dragdrop.empty}</div>
				{/if}
				{#each pool.items as item, j (item.id)}
					<div
						use:dragItem={{ stackSrcId: pool.id, itemSrcId: item.id, item }}
						in:receive={{ key: j }}
						out:send={{ key: j }}
						animate:flip={{ duration: 500 }}
						class="border-2 shrink-0 p-2 h-12 flex items-center justify-center"
					>
						<div>
							{item.name}
						</div>
					</div>
				{/each}
			</div>
		</div>
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
