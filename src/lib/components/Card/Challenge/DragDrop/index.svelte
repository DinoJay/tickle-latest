<script>
	import DragDropCont from './DragDropCont.svelte';
	import { v4 as uuid } from 'uuid';

	export let currentActSub;
	export let activity;
	export let onSubmit;

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

	const POOLTYPE = 'pool';
	let stack =
		currentActSub?.response || [
			...activity?.value?.stack?.map((d) => ({ ...d, id: uuid(), items: [] }))
		] ||
		exampleStack;

	const allSetItems = currentActSub?.response?.flatMap((d) => d.items) || [];
	console.log('allSetItems', allSetItems);
	console.log('stack', stack);

	let pool = {
		name: 'All Items',
		type: POOLTYPE,
		items: activity?.value?.stack.flatMap((d) =>
			d.items.filter((e) => !allSetItems.find((f) => f.id === e.id))
		)
	};

	console.log('stack', stack);
</script>

<DragDropCont
	{...$$props}
	{stack}
	{pool}
	onSubmit={(st, po) => {
		const succeedded = false;
		stack = st;
		console.log('st', st, 'po', po);
		pool = po;
		onSubmit({ response: st });
	}}
/>
