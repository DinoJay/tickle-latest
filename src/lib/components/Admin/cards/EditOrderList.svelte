<script>
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import Description from './../../Card/Description.svelte';
	import { flip } from 'svelte/animate';
	import { v4 as uuidv4 } from 'uuid';
	import LightBox from '$lib/components/utils/LightBox.svelte';

	export let value = { itemList: null, description: '' };
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
	let modalOpen = false;

	$: itemList = value?.itemList || exampleList.map((d) => ({ ...d, id: uuidv4() }));

	const drop = (event, target) => {
		event.dataTransfer.dropEffect = 'move';
		const start = parseInt(event.dataTransfer.getData('text/plain'));

		const startItem = itemList.find((d, i) => i === start);
		const tmpList = itemList.filter((d, i) => i !== start);
		const newItemList = [...tmpList.slice(0, target), startItem, ...tmpList.slice(target)];
		hovering = null;
		onChange({ ...value, itemList: newItemList });
	};

	const dragstart = (event, i) => {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.dropEffect = 'move';
		const start = i;
		event.dataTransfer.setData('text/plain', start);
	};
</script>

<div class="mb-3">
	<div class="label">Description:</div>
	<textarea
		placeholder="Please enter your description"
		class="text-area w-full"
		on:change={(e) => onChange({ ...value, description: e.target.trim() })}
	/>
</div>
<div>
	<div class="label">Reordable List:</div>
	<div class="drop-shadow-sm ">
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
					<span>#{index}</span>
					{n.name}
				</div>
				<button
					class="ml-auto"
					on:click={() => {
						onChange({ ...value, itemList: itemList.filter((d, i) => d.id !== n.id) });
					}}><WindowClose color="red" /></button
				>
			</div>
		{/each}
	</div>
	<button class="mt-3 create-btn-2 w-full" on:click={() => (modalOpen = true)}
		>Create new Item</button
	>
</div>

<button class="mt-auto create-btn w-full">Save and Close</button>

<LightBox title="Create new Item" isOpen={modalOpen} height={200} close={() => (modalOpen = false)}>
	<div>
		<div class="label">Name:</div>
		<input
			placeholder="Please enter the name of the item"
			class="form-text input-text w-full "
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
			modalOpen = false;
		}}>Create new Item</button
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
