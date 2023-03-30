<script>
	import OrderList from './OrderList.svelte';
	import { v4 as uuid } from 'uuid';

	export let currentActSub;
	export let activity;
	export let onSubmit;

	const POOLTYPE = 'pool';
	let itemSlots = currentActSub?.response || [
		...activity?.value?.itemList?.map((d) => ({ id: uuid(), itemId: null }))
	];

	let pool = activity?.value?.itemList.filter(
		(d) => itemSlots.find((e) => e.itemId === d.id) === undefined
	);

	$: description = activity?.value?.description;

	$: allItems = activity?.value?.itemList;

	console.log('itemSlots', itemSlots);
	console.log('pool', pool);
</script>

<OrderList
	{...$$props}
	{itemSlots}
	{allItems}
	{pool}
	{description}
	onSubmit={(st, po) => {
		const succeedded = false;
		itemSlots = st;
		// console.log('st', st, 'po', po);
		pool = po;
		onSubmit({ response: st });
	}}
/>
