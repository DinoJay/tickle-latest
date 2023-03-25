<script>
	import { flip } from 'svelte/animate';
	import { send, receive } from './transition.js';

	export let activity = { value: { stack: [], description: '' } };
	export let currentActSub = { response: { stack: [] } };

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
	$: pool = currentActSub?.response?.pool || activity.value.pool || examplePool;

	$: poolStack = [...stack, pool];

	let stackHover;

	function dragStart(event, stackIndex, itemIndex) {
		const data = { stackIndex, itemIndex };
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	function drop(event, stackIndex) {
		event.preventDefault();
		const json = event.dataTransfer.getData('text/plain');
		const data = JSON.parse(json);
		console.log('data', data, 'stackIndex', stackIndex);
		console.log('st', stack, data.stackIndex, poolStack[data.stackIndex]);
		const [item] = poolStack[data.stackIndex].items.splice(data.itemIndex, 1);
		//TODO
		poolStack[stackIndex].items.push(item);
		// RandomStack = RandomStack;

		stackHover = null;
	}

	// $: console.log('poolStack', poolStack);
</script>

<p>Drag a framework/library from random to respected drop</p>

{#if !!stack}
	{#each poolStack as s, i (s.name)}
		<div class="h-32" animate:flip in:receive={{ key: i }} out:send={{ key: stackIndex }}>
			<b>{s.name}</b>
			<p
				class:hovering={stackHover === s.name}
				on:dragenter={() => (stackHover = s.name)}
				on:dragleave={() => (stackHover = null)}
				on:drop={(event) => drop(event, i)}
				ondragover="return false"
			>
				{#each s.items as item, itemIndex (item)}
					<div
						class="item"
						in:receive={{ key: itemIndex }}
						out:send={{ key: itemIndex }}
						animate:flip={{ duration: 500 }}
					>
						<li draggable={true} on:dragstart={(event) => dragStart(event, i, itemIndex)}>
							{item}
						</li>
					</div>
				{/each}
			</p>
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
	li {
		background-color: #00ffff;
		cursor: pointer;
		display: inline-block;
		margin-right: 10px;
		padding: 10px;
	}
	li:hover {
		background: red;
		color: white;
	}
	p {
		border: solid green 1px;
		display: flex; /* required for drag & drop to work when .item display is inline */
		height: 60px; /* needed when empty */
		padding: 10px;
	}
</style>
