<script>
	import OrderList from './OrderList.svelte';
	import { v4 as uuid } from 'uuid';
	import Confetti from 'svelte-confetti/src/Confetti.svelte';
	import Notification from '$lib/components/Notifications/Notification.svelte';
	import avatars from '$lib/components/AvatarManager/avatars';

	export let currentActSub;
	export let activity;
	export let onSubmit;
	export let actValAcc = 'value';

	$: actVal = activity?.[actValAcc];

	const POOLTYPE = 'pool';
	let itemSlots = currentActSub?.response || [
		...actVal?.itemList?.map((d) => ({ id: uuid(), itemId: null }))
	];

	let pool = activity?.value?.itemList.filter(
		(d) => itemSlots.find((e) => e.itemId === d.id) === undefined
	);

	$: description = actVal?.description;

	$: allItems = actVal?.itemList;

	const isSuccess = (itemList, itemSlots) => {
		const itemIds = itemList.map((d) => d.id);
		const slotIds = itemSlots.map((d) => d.itemId);
		return JSON.stringify(itemIds) === JSON.stringify(slotIds);
	};
	let succeeded = isSuccess(actVal.itemList, itemSlots);
</script>

{#if succeeded === true}
	<div
		class="absolute overflow-hidden left-0 flex justify-center w-full h-full pointer-events-none"
		style:top="-50px"
	>
		<Confetti
			x={[-5, 5]}
			y={[0, 0.1]}
			delay={[500, 2000]}
			infinite
			duration={5000}
			amount={500}
			fallDistance="100vh"
		/>
	</div>
	<Notification type="success" close={() => (succeeded = null)}>Yay, you did it!</Notification>
{/if}
{#if succeeded === false}
	<Notification close={() => (succeeded = null)}>Nah, you failed!</Notification>
{/if}
<OrderList
	{...$$props}
	{itemSlots}
	{allItems}
	{pool}
	{description}
	onSubmit={(newItemSlots, po) => {
		itemSlots = newItemSlots;
		// console.log('st', st, 'po', po);
		console.log('submit', activity);
		pool = po;
	}}
/>
<button
	class="btn"
	on:click={() => {
		onSubmit({ response: itemSlots });
		succeeded = isSuccess(actVal?.itemList, itemSlots);
	}}>Submit</button
>
