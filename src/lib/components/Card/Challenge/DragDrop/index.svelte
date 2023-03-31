<script>
	import DragDropCont from './DragDropCont.svelte';
	import { v4 as uuid } from 'uuid';
	import { addNotification } from '/src/stores/notificationStore';

	import Confetti from 'svelte-confetti/src/Confetti.svelte';
	import Notification from '$lib/components/Notifications/Notification.svelte';

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
		currentActSub?.response || [...activity?.value?.stack?.map((d) => ({ ...d, items: [] }))] ||
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

	const isSuccess = (stack, st) =>
		stack.every((d) => {
			const submissionStack = st.find((f) => f.id === d.id);
			return d.items.every((e) => {
				return submissionStack.items.find((g) => g.id === e.id);
			});
		});

	let succeeded = isSuccess(activity?.value?.stack, stack);
</script>

{#if succeeded}
	<div
		class="absolute overflow-hidden left-0 flex justify-center  w-full h-full pointer-events-none"
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
	<Notification type="success" close={() => (succeeded = false)}>Yay, you did it!</Notification>
{/if}
<DragDropCont
	{...$$props}
	{stack}
	{pool}
	{succeeded}
	onSubmit={(st, po) => {
		succeeded = isSuccess(activity?.value?.stack, st);
		console.log('success', succeeded);
		pool = po;
		onSubmit({ response: st, succeeded });

		// addNotification({ text: 'Yay, you dit it!', type: 'info' });
	}}
/>
