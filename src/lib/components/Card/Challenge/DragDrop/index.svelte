<script>
	import DragDropCont from './DragDropCont.svelte';

	export let currentActSub;
	export let activity;

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
		//TODO
		currentActSub?.response?.stack || [
			...activity?.value?.stack?.map((d) => ({ ...d, items: [] }))
		] ||
		exampleStack;

	let pool =
		{
			name: 'Pool',
			type: POOLTYPE,
			items: activity?.value?.stack.flatMap((d) => d.items)
		} || examplePool;
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
		// onSubmit({ response: st });
	}}
/>
