<script>
	import { langDict } from './../../../../../stores/localizationStore.js';
	import { transition } from 'd3-transition';
	import { flip } from 'svelte/animate';
	import { slide, blur, fly, fade, crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import interact from 'interactjs';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
	export let currentActSub = null; //{ response: { stack: [] } };
	export let onSubmit;
	export let itemSlots;
	export let pool;
	export let description;
	export let allItems;

	let dropZoneHoverId = null;
	let srcItemId = null;
	let isHovering = false;
	// function dragStart(event, srcItemId) {
	// 	event.dataTransfer.setData('text/plain', srcItemId);
	// }

	// console.log('itemSlots', itemSlots);
	// console.log('allItems', allItems);

	function drop(targetSlotIndex) {
		if (!srcItemId) return;

		const srcItemSlotId = itemSlots.find((d) => d.itemId === srcItemId)?.id;
		let tmpId = null;
		const tmpItemSlots = itemSlots.map((d, i) => {
			let itemId = d.itemId;
			if (targetSlotIndex === i) {
				tmpId = d.itemId;
				itemId = srcItemId;
			}
			return { ...d, itemId };
		});
		const newItemSlots = tmpItemSlots.map((d, i) => {
			let itemId = d.itemId;
			if (d.id === srcItemSlotId) {
				itemId = tmpId;
			}
			return { ...d, itemId };
		});
		const newPool = allItems.filter((d, i) => !newItemSlots.find((e) => e.itemId === d.id));

		onSubmit(newItemSlots, newPool);

		dropZoneHoverId = null;
	}

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
	// let draggingItem = null;

	const dragItem = (node, { itemSrcId, isHovering: hover }) => {
		interact(node).draggable({
			inertia: true,
			listeners: {
				move: dragMoveListener,
				end(event) {
					event.target.style.position = null;
					event.target.style.left = null;
					event.target.style.top = null;

					event.target.setAttribute('data-x', null);
					event.target.setAttribute('data-y', null);
				},
				start() {
					srcItemId = itemSrcId;
					isHovering = hover;
				}
			},
			onstart(event) {
				let target = event.target;
				let rect = target.getBoundingClientRect();
				target.setAttribute('data-x', rect.x);
				target.setAttribute('data-y', rect.y);
			},
			autoScroll: true,
			maxPerElement: 1
			// dragMoveListener from the dragging demo above
		});
	};

	const dropZone = (node, { targetIndex, dropZoneId }) => {
		interact(node).dropzone({
			overlap: 0.75,
			ondragenter: function (event) {
				dropZoneHoverId = dropZoneId;
			},
			ondragleave: function (event) {
				dropZoneHoverId = null;
			},
			ondrop: function (event) {
				drop(targetIndex);
			}
		});
	};
</script>

<div class="mb-3">
	<div class="label text-xl">Description:</div>
	<p class="">
		{description || 'No description provided.'}
	</p>
</div>

<div class="flex-grow overflow-y-auto" style="max-height:300px">
	{#each itemSlots as s, i (s.itemId + '-' + s.id)}
		<div
			animate:flip
			in:receive={{ key: s.itemId }}
			out:send={{ key: s.itemId }}
			class="mb-3 flex border-2 border-dashed z-50 items-center gap-2 p-2"
			style:height="60px"
			class:list-item-hover={dropZoneHoverId === s.id && isHovering}
			use:dropZone={{ targetIndex: i, dropZoneId: s.id }}
			use:dragItem={{ itemSrcId: s.itemId, isHovering: false }}
		>
			<div>{i + 1}:</div>
			{#key s.itemId}
				<div>
					{#if allItems.find((d) => d.id === s.itemId)}
						<div class="flex border-2 p-2">
							<div>{allItems.find((d) => d.id === s.itemId).name}</div>
						</div>
					{:else}
						<div class="text-gray-400">Empty</div>
					{/if}
				</div>
			{/key}
		</div>
	{/each}
</div>
<div class="flex-grow flex-col overflow-y-auto" style:min-height="150px" style:max-height="230px">
	<p class="label text-xl">{$langDict.reorder_list.all_items}:</p>
	<div class="flex flex-wrap border-2 border-dashed gap-2 p-2">
		{#each pool as p, i (p.id)}
			<div
				class="flex border-2 items-center p-2"
				style:height="44px"
				use:dragItem={{ itemSrcId: p.id, isHovering: true }}
			>
				<div>{p.name}</div>
			</div>
		{/each}
		{#if pool.length === 0}
			<button
				class="p-2 border-2 mx-auto"
				on:click={() => {
					const newItemSlots = itemSlots.map((d) => ({ ...d, itemId: null }));

					const newPool = [...allItems];

					onSubmit(newItemSlots, newPool);
				}}>{$langDict.reorder_list.reset} Items</button
			>
		{/if}
	</div>
</div>

<style>
	.stack {
		height: 70px;
		@apply overflow-y-hidden;
	}
	.pool {
		height: 70px;
		max-height: 200px;
		min-height: 70px;
		@apply flex-wrap;
	}
	.list-item-hover {
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
