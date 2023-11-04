<script>
	import { langDict } from './../../../../../stores/localizationStore.js';
	import OrderList from './OrderList.svelte';
	import { v4 as uuid } from 'uuid';
	import Confetti from 'svelte-confetti/src/Confetti.svelte';
	import Notification from '$lib/components/Notifications/Notification.svelte';
	import avatars from '$lib/components/AvatarManager/avatars';

	export let currentActSub;
	export let activity;
	export let onSubmit;

	// const POOLTYPE = 'pool';
	$: console.log('activity ORDER', activity);

	let itemSlots = currentActSub?.response || [
		...activity.value?.itemList?.map((d) => ({ id: uuid(), itemId: null }))
	];

	let pool = activity?.value?.itemList?.filter(
		(d) => itemSlots.find((e) => e.itemId === d.id) === undefined
	);

	const description = activity.value?.description;
	const allItems = activity.value?.itemList;

	const isSuccess = (itemList, itemSlots) => {
		const itemIds = itemList.map((d) => d.id);
		const slotIds = itemSlots.map((d) => d.itemId);
		return JSON.stringify(itemIds) === JSON.stringify(slotIds);
	};
	let succeeded = false;

	let submitted = false;
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
	<Notification type="success" close={() => (succeeded = null)}
		>{$langDict.reorder_list.you_succeeded}</Notification
	>
{/if}
{#if succeeded === false && submitted}
	<Notification close={() => (succeeded = null)}>{$langDict.reorder_list.you_failed}</Notification>
{/if}
<OrderList
	{...$$props}
	{itemSlots}
	{allItems}
	{pool}
	{description}
	onSubmit={(newItemSlots, po) => {
		submitted = false;
		itemSlots = newItemSlots;
		// console.log('itemslots', itemSlots);
		// console.log('st', st, 'po', po);
		// console.log('submit', activity);
		pool = po;
	}}
/>
<button
	class="btn mt-3"
	on:click={() => {
		submitted = true;
		succeeded = isSuccess(activity.value?.itemList, itemSlots);
		onSubmit({ response: itemSlots, succeeded });
	}}>{$langDict.reorder_list.submit}</button
>
