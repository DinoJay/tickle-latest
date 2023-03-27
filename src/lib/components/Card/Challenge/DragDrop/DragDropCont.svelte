<script>
	import { flip } from 'svelte/animate';
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
		const data = { stackIndexSrc, itemIndexSrc };
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	function drop(event, targetStackIndex) {
		event.preventDefault();
		const json = event.dataTransfer.getData('text/plain');
		const data = JSON.parse(json);
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

{#if !!stack}
	{#each poolStack as s, i (s.name)}
		<div class="mb-3" animate:flip in:receive={{ key: i }} out:send={{ key: i }}>
			<h2 class="mb-2 text-lg">{s.name}</h2>
			<div
				class="overflow-auto mb-3 flex  items-center gap-2 p-2 {stackHover === s.name &&
				s.type !== POOLTYPE
					? 'border-4 border-dashed'
					: 'border-2'}"
				class:flex-wrap={s.type === POOLTYPE}
				style="height: {s.type !== POOLTYPE ? '70px' : ''};max-height: {s.type === POOLTYPE
					? '200px'
					: ''};"
				on:dragenter={() => (stackHover = s.name)}
				on:dragleave={() => (stackHover = null)}
				on:drop={(event) => drop(event, i)}
				ondragover="return false"
			>
				{#each s.items as item, j (item.id)}
					<div
						draggable={true}
						on:dragstart={(event) => dragStart(event, i, j)}
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

<style>
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
