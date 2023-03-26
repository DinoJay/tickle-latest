<script>
	import { flip } from 'svelte/animate';
	import { send, receive } from './transition.js';

	export let activity = { value: { stack: [], description: '' } };
	export let currentActSub = { response: { stack: [] } };

	const POOLTYPE = 'pool';

	const exampleStack = [
		{
			name: 'Frontend Stack',
			items: []
		},
		{
			name: 'Backend Stack',
			items: []
		},
		{
			name: 'Server Stack',
			items: []
		}
	];

	const examplePool = {
		name: 'Pool',
		type: POOLTYPE,
		items: [
			'Django',
			'Vercel',
			'React',
			'Svelte',
			'SvelteKit',
			'Angular',
			'Solid',
			'Rails',
			'Express',
			'Flask',
			'VPS'
		]
	};

	$: stack =
		currentActSub?.response?.stack ||
		activity?.value?.stack?.map((d) => ({ ...d, items: [] })) ||
		exampleStack;
	$: pool = currentActSub?.response?.pool || examplePool;

	$: poolStack = [...stack, pool];

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

		stackHover = null;
	}

	// $: console.log('poolStack', poolStack);
</script>

<p>Drag a framework/library from random to respected drop</p>

{#if !!stack}
	{#each poolStack as s, i (s.name)}
		<div class="mb-3" animate:flip in:receive={{ key: i }} out:send={{ key: i }}>
			<h2 class="mb-2">{s.name}</h2>
			<div
				class="overflow-y-auto mb-3 flex  gap-2 p-2 {stackHover === s.name && s.type !== POOLTYPE
					? 'border-4 border-dashed'
					: 'border-2'}"
				class:flex-wrap={s.type === POOLTYPE}
				style="height: {s.type === POOLTYPE ? '200px' : '60px'};}"
				on:dragenter={() => (stackHover = s.name)}
				on:dragleave={() => (stackHover = null)}
				on:drop={(event) => drop(event, i)}
				ondragover="return false"
			>
				{#each s.items as item, j (item)}
					<div
						draggable={true}
						on:dragstart={(event) => dragStart(event, i, j)}
						class="border-2 p-2 h-12 flex items-center justify-center"
						in:receive={{ key: j }}
						out:send={{ key: j }}
						animate:flip={{ duration: 500 }}
					>
						<div>
							{item}
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
