<script>
	import { slide } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	export let value = { itemList: null, description: '' };
	export let onChange;

	const exampleList = [
		{
			name: 'Item A'
		},
		{
			name: 'Item B'
		},
		{
			name: 'Item C'
		}
	];

	$: itemList = value?.itemList || exampleList.map((d) => ({ ...d, id: uuidv4() }));

	// $: blankItemList = blankId;

	$: console.log('itemlist', itemList);

	let dropIndex = null;
	let srcIndex = null;
	let previewIndex;
	let timeoutId;

	function handleDragStart(event, index) {
		srcIndex = index;
		console.log('src index', index);
		const srcItem = itemList.find((d, i) => i === index);
		console.log('srcItem', srcItem);

		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

		// Create a new Image element and set it as the drag image
		if (isIOS) {
			const dragImage = new Image();
			dragImage.src = '/drag.png';

			// dragImage.style.transform = 'scale(1.5)';
			// dragImage.style.width = '60px';
			// dragImage.style.height = '40px';
			event.dataTransfer.setDragImage(dragImage, event.offsetX, event.offsetY);
		}
		// event.dataTransfer.setData('text/plain', id);
	}

	function handleDragOver(event) {
		event.preventDefault();
		// console.log('event dragover', event.target);
		const target = event.target.closest('li');
		dropIndex = +target.dataset.index;

		const tgtItem = itemList.find((d, i) => d.id === dropIndex);
	}

	function handleDrop(event) {
		// const srcId = event.dataTransfer.getData('text/plain');

		const srcItem = itemList.find((d, i) => i === srcIndex);
		const tgtItem = itemList.find((d, i) => i === dropIndex);
		console.log('DROP srcItem', srcItem);
		console.log('DROP tgtItem', tgtItem);
		// const targetIndex = parseInt(event.target.querySelector('[data-dropindex]').dataset.dropindex);

		// // const targetIndex = blankItemList.findIndex((d) => d.type === 'blank');

		// // parseInt(event.target.dataset.index);
		// console.log('drop DROP src', srcIndex, 'tgt', targetIndex);
		if (srcIndex !== dropIndex) {
			const tmpList = itemList.filter((d, i) => i !== srcIndex);
			// items = newItemList;
			const newItemList = [...tmpList.slice(0, dropIndex), srcItem, ...tmpList.slice(dropIndex)];
			console.log('newItemList', newItemList);
			onChange({ ...value, itemList: newItemList });
			// itemList.splice(targetIndex, 0, removed[0]);
		}
		dropIndex = null;
		srcIndex = null;
		// blankIndex = null;
	}
</script>

<ul
	class="text-xl p-8"
	transition:slide
	on:dragover={(e) => e.preventDefault()}
	on:dragleave={(e) => {
		e.preventDefault();
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			previewIndex = null;
		}, 800);
		// previewIndex = null;
	}}
	on:drop={handleDrop}
>
	{#each itemList as item, index}
		<li
			class="border border-gray-500 p-2 mb-2"
			draggable="true"
			on:dragstart={(event) => handleDragStart(event, index)}
			on:dragover={(event) => handleDragOver(event)}
			data-index={index}
		>
			{item.name}
		</li>
		{#if dropIndex === index && dropIndex !== itemList.length - 1}
			<li class="text-gray-500" data-index={index}>Drop here</li>
		{/if}
	{/each}
	{#if dropIndex !== null && dropIndex === itemList.length - 1}
		<li class="text-gray-500">Drop here</li>
	{/if}
</ul>
