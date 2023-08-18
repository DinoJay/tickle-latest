<script>
	import Description from './../../Card/Description.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';

	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import PencilBox from 'svelte-material-icons/Pencil.svelte';

	export let value = { stack: null, description: '' };
	import { v4 as uuidv4 } from 'uuid';

	/**
	 * @type {(arg0: { description: any; stack: any[] | never[] | any[]; }) => void}
	 */
	export let onChange;
	export let onClose;

	const abc = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	];

	const exampleStack = [
		{
			id: uuidv4(),
			name: 'Catergory A',
			items: [
				{
					id: uuidv4(),
					name: 'item1'
				},
				{
					id: uuidv4(),
					name: 'item2'
				}
			]
		},
		{
			id: uuidv4(),
			name: 'Category B',
			items: [
				{
					id: uuidv4(),
					name: 'item3'
				},
				{
					id: uuidv4(),
					name: 'item4'
				}
			]
		},
		{
			id: uuidv4(),
			name: 'Category C',
			items: [
				{
					id: uuidv4(),
					name: 'item5'
				},
				{
					id: uuidv4(),
					name: 'item6'
				}
			]
		}
	];

	/**
	 * @type {string|null}
	 */
	let selectedStackId = null;
	let selectedItemId = null;
	$: stack = value?.stack || exampleStack;
	// $: console.log('value', stack);
	// $: console.log('stack', stack);

	$: selectedStack = stack.find((s) => s.id === selectedStackId);

	$: allItems = stack.flatMap((s) => s.items);
	$: selectedItem = allItems.find((d) => d.id === selectedItemId);
</script>

<div class="label text-lg">Description:</div>
<textarea
	value={value?.description || ''}
	on:change={(e) => onChange({ ...value, description: e.target?.value || '' })}
	placeholder="Please enter your hint"
	class="input-text w-full h-24"
/>
<div class="mt-3 flex-grow flex flex-col overflow-y-auto">
	<h2 class="text-lg mb-3 label">Categories:</h2>

	<div class="overflow-y-auto flex-grow">
		{#each stack as s}
			<div class="mb-3 border-2 p-3 relative ">
				<button class="flex items-center mb-3" on:click={() => (selectedStackId = s.id)}>
					<h3 class="text-lg mr-1">{s.name}</h3>
					<PencilBox size={20} />
				</button>
				<div class="absolute right-0 top-0 p-2">
					<button
						class="ml-auto"
						on:click={() => {
							onChange({
								...value,
								stack: stack.filter((d) => d.id !== s.id)
							});
						}}><WindowClose color="red" /></button
					>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each s.items as it}
						<button
							on:click={() => {
								console.log('id id', it.id);
								selectedItemId = it.id;
							}}
							class="border-2  py-1 px-2 flex items-center"
						>
							<div>{it.name}</div>
							<div class="ml-1"><PencilBox /></div>
						</button>
					{/each}
					<button
						class="create-btn-2"
						on:click={() => {
							const ns = stack.map((d) => {
								let items = d.items;
								if (d.id === s.id) {
									items = [...d.items, { id: uuidv4(), name: `New Item ${allItems.length + 1}` }];
								}
								return { ...d, items };
							});
							onChange({ ...value, stack: ns });
						}}>Add Item</button
					>
				</div>
			</div>
		{/each}
	</div>
	<button
		class="create-btn-2 w-full"
		on:click={() => {
			onChange({
				...value,
				stack: [
					...stack,
					{ name: `New Category ${abc[stack.length % (abc.length - 1)]}`, items: [], id: uuidv4() }
				]
			});
		}}>Add Category</button
	>
</div>

<button
	class="w-full create-btn mt-3"
	on:click={() => {
		onClose();
		onChange({ ...value, stack });
	}}
>
	Save & Close
</button>

<LightBox
	title={selectedStack?.name}
	isOpen={selectedStackId !== null}
	height={null}
	close={() => (selectedStackId = null)}
>
	<input
		class="input-text w-full"
		placeholder="Enter name"
		type="text"
		on:change={(e) => {
			const ns = stack.map((d) => {
				return d.id === selectedStackId ? { ...d, name: e.target?.value?.trim() } : d;
			});
			onChange({ ...value, stack: ns });
		}}
	/>
	<button
		class="w-full create-btn mt-auto"
		on:click={() => {
			selectedStackId = null;
		}}
	>
		Save & Close
	</button>
</LightBox>

<LightBox
	isOpen={!!selectedItemId}
	title={selectedItem?.name}
	height={null}
	close={() => {
		selectedItemId = null;
	}}
>
	<input
		class="input-text w-full"
		value={selectedItem?.name}
		type="text"
		on:change={(event) => {
			const ns = stack.map((d) => {
				const items = d.items.map((e) => {
					return e.id === selectedItemId ? { ...e, name: event.target?.value?.trim() } : e;
				});
				return { ...d, items };
			});
			onChange({ ...value, stack: ns });
		}}
	/>
	<button
		class="del-btn mt-auto"
		on:click={() => {
			const ns = stack.map((d) => {
				const items = d.items.filter((e) => e.id !== selectedItemId);
				return { ...d, items };
			});
			selectedItemId = null;
			onChange({ ...value, stack: ns });
		}}>Remove Item</button
	>
</LightBox>

<style>
</style>
