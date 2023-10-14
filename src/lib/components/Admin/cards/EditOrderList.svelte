<script>
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import Description from './../../Card/Description.svelte';
	import { flip } from 'svelte/animate';
	import { v4 as uuidv4 } from 'uuid';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import PencilBox from 'svelte-material-icons/Pencil.svelte';

	export let value = { itemList: null, description: '' };
	export let onClose;
	/**
	 * @type {(arg0: { itemList: ({ id: any; name: string; } | undefined)[]; description: string; }) => void}
	 */
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
	/**
	 * @type {number | null}
	 */
	let hovering = null;
	let newItemTitle = null;
	let newItemModalOpen = false;
	/**
	 * @type {null | string}
	 */
	let selectedId = null;

	$: itemList = value?.itemList || [];
	$: selectedItem = itemList.find((d) => d.id === selectedId);

	const drop = (event, target) => {
		// event.dataTransfer.dropEffect = 'move';
		const start = parseInt(event.dataTransfer.getData('text/plain'));

		const startItem = itemList.find((d, i) => i === start);
		const tmpList = itemList.filter((d, i) => i !== start);
		const newItemList = [...tmpList.slice(0, target), startItem, ...tmpList.slice(target)];
		hovering = null;
		onChange({ ...value, itemList: newItemList });
	};

	const dragstart = (event, i) => {
		// event.dataTransfer.effectAllowed = 'move';
		// event.dataTransfer.dropEffect = 'move';
		const start = i;
		event.dataTransfer.setData('text/plain', start);
	};
</script>

<div class="mb-3">
	<div class="label">Description:</div>
	<textarea
		placeholder="Please enter your description"
		class="text-area w-full"
		value={value?.description || ''}
		on:change={(e) => onChange({ ...value, description: e.target.value.trim() })}
	/>
</div>
<div class="label">Reordable List:</div>
<div class="drop-shadow-sm flex flex-auto h-12 flex-col overflow-y-auto">
	{#if itemList.length === 0}
		<div class="m-auto text-xl placeholder-text">No Items</div>
	{/if}
	{#each itemList as n, index (n.id)}
		<div
			class="border-2 mb-1 p-2 bg-white flex items-center"
			animate:flip={{ duration: 200 }}
			draggable={true}
			on:dragstart={(event) => dragstart(event, index)}
			on:drop|preventDefault={(event) => drop(event, index)}
			ondragover="return false"
			on:dragenter={() => (hovering = index)}
			class:active={hovering === index}
		>
			<div>
				<span>#{index + 1}</span>
				{n.name}
			</div>
			<button class="ml-3" on:click={() => (selectedId = n.id)}>
				<PencilBox />
			</button>
			<button
				class="ml-auto"
				on:click={() => {
					onChange({ ...value, itemList: itemList.filter((d, i) => d.id !== n.id) });
				}}><WindowClose color="red" /></button
			>
		</div>
	{/each}
</div>
<button class="mt-auto create-btn-2 w-full" on:click={() => (newItemModalOpen = true)}
	>Create new Item</button
>

<LightBox
	title="Create new Item"
	isOpen={newItemModalOpen}
	close={() => (newItemModalOpen = false)}
>
	<div class="mb-3">
		<div class="label">Name:</div>
		<input
			placeholder="Please enter the name of the item"
			class="form-text input-text w-full"
			type="text"
			bind:value={newItemTitle}
		/>
	</div>
	<button
		class="create-btn mt-auto"
		disabled={newItemTitle === null}
		class:disabled={newItemTitle === null}
		on:click={() => {
			onChange({ ...value, itemList: [...itemList, { name: newItemTitle, id: uuidv4() }] });
			newItemTitle = null;
			newItemModalOpen = false;
		}}>Create new Item</button
	>
</LightBox>

<LightBox
	title={selectedItem?.name}
	isOpen={!!selectedId}
	height={200}
	close={() => (selectedId = null)}
>
	<div>
		<div class="label">Name:</div>
		<input
			placeholder="Please enter the name of the item"
			class="form-text input-text w-full"
			type="text"
			value={selectedItem?.name}
			on:change={(e) => {
				onChange({
					...value,
					itemList: itemList.map((d) => {
						if (d.id === selectedItem?.id) {
							return { ...d, name: e.target?.value?.trim() };
						}
						return d;
					})
				});
			}}
		/>
	</div>
	<button
		class="create-btn mt-auto"
		disabled={selectedItem?.name === ''}
		class:disabled={selectedItem?.name === ''}
		on:click={() => {
			selectedId = null;
		}}>Save and Close</button
	>
</LightBox>

<style>
	/* .list-item:not(:last-child) {
		border-bottom: 1px solid #dbdbdb;
	} */

	.active {
		/* @apply bg-gray-700 @apply text-white; */
		/* height: 70px; */
		@apply bg-gray-700;
		@apply text-white;
	}
</style>
