<script>
	import OrderList from './../../Card/Challenge/OrderList/OrderList.svelte';
	import Hangman from './../../Card/Challenge/Hangman/Hangman.svelte';
	import Check from 'svelte-material-icons/Check.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import EditQuiz from './EditQuiz.svelte';
	import { QUIZ, GEOCACHING, HANGMAN, DRAGDROP, ORDERLIST } from './activityConsts';
	import EditGeoCaching from './EditGeoCaching/index.svelte';
	import EditHangman from './EditHangman.svelte';
	import EditDragDrop from './EditDragDrop.svelte';
	import EditOrderList from './EditOrderList.svelte';
	import { EN, FR, NL } from '$lib/constants/locales';

	/**
	 * @type {{ type: string; value_en: any; value_fr:any; value_nl:any }}
	 */
	export let activity;
	/**
	 * @type {(arg0: { type: string; value_en: any; value_fr:any; value_nl:any}) => any}
	 */
	export let onChange;
	/**
	 * @type {any}
	 */
	export let onRemove;

	const ACTIVITIES = [QUIZ, GEOCACHING, HANGMAN, DRAGDROP, ORDERLIST];

	/**
	 * @type {string | null}
	 */
	let selectedActivity = null;
	$: console.log('ACT props', $$props);
</script>

<div class="flex flex-col gap-2 flex-grow">
	{#each ACTIVITIES as a}
		<button
			class="p-2 text-xl flex-grow border-2 {activity?.type === a ? 'bg-gray-700 text-white' : ''}"
			on:click={() => (selectedActivity = a)}>{a}</button
		>
	{/each}
	{#if !!activity}
		<button class="del-btn" on:click={onRemove}>Remove Activity</button>
	{/if}
</div>

<LightBox
	title={QUIZ}
	isOpen={selectedActivity === QUIZ}
	close={() => (selectedActivity = null)}
	width="100%"
>
	<div class="act-cont">
		<div class="act-sec">
			<h2>Quiz {EN}</h2>
			<EditQuiz
				onClose={() => (selectedActivity = null)}
				value={activity?.value_en}
				onChange={(/** @type {any} */ questions) => {
					console.log('QUIZ value', questions);
					onChange({ ...activity, type: QUIZ, value_en: questions });
				}}
			/>
		</div>
		<div class="act-sec py-3 md:py-0 md:px-3">
			<h2>Quiz {FR}</h2>
			<EditQuiz
				onClose={() => (selectedActivity = null)}
				value={activity?.value_fr}
				onChange={(questions) => {
					console.log('QUIZ value', questions);
					onChange({ ...activity, type: QUIZ, value_fr: questions });
				}}
			/>
		</div>
		<div class="act-sec">
			<h2>Quiz {NL}</h2>
			<EditQuiz
				onClose={() => (selectedActivity = null)}
				value={activity?.value_nl}
				onChange={(questions) => {
					console.log('QUIZ value', questions);
					onChange({ ...activity, type: QUIZ, value_nl: questions });
				}}
			/>
		</div>
	</div>
	<button class="w-full create-btn mt-3" on:click={() => (selectedActivity = null)}>
		Save & Close
	</button>
</LightBox>

<LightBox
	title={activity?.value?.title || GEOCACHING}
	isOpen={selectedActivity === GEOCACHING}
	close={() => (selectedActivity = null)}
	width="100%"
>
	<div class="act-cont">
		<div class="act-sec">
			<h2>GeoCaching {EN}</h2>
			<EditGeoCaching
				onClose={() => (selectedActivity = null)}
				value={activity?.value_en}
				onChange={(/** @type {any} */ value_en) =>
					onChange({ ...activity, type: GEOCACHING, value_en })}
			/>
		</div>
		<div class="act-sec spacer">
			<h2>GeoCaching {FR}</h2>
			<EditGeoCaching
				onClose={() => (selectedActivity = null)}
				value={activity?.value_fr}
				onChange={(/** @type {any} */ value_fr) =>
					onChange({ ...activity, type: GEOCACHING, value_fr })}
			/>
		</div>
		<div class="act-sec">
			<h2>GeoCaching {NL}</h2>
			<EditGeoCaching
				onClose={() => (selectedActivity = null)}
				value={activity?.value_nl}
				onChange={(/** @type {any} */ value_nl) =>
					onChange({ ...activity, type: GEOCACHING, value_nl })}
			/>
		</div>
	</div>
	<button class="w-full create-btn mt-3" on:click={() => (selectedActivity = null)}>
		Save & Close
	</button>
</LightBox>
<LightBox
	title={HANGMAN}
	isOpen={selectedActivity === HANGMAN}
	close={() => (selectedActivity = null)}
	width="100%"
>
	<div class="act-cont">
		<div class="act-sec">
			<h2>Hangman {EN}</h2>
			<EditHangman
				id="h0"
				value={activity?.value_en}
				onClose={() => (selectedActivity = null)}
				onChange={(/** @type {any} */ value_en) => {
					onChange({ ...activity, type: HANGMAN, value_en });
				}}
			/>
		</div>
		<div class="act-sec spacer">
			<h2>Hangman {FR}</h2>
			<EditHangman
				id="h1"
				value={activity?.value_fr}
				onClose={() => (selectedActivity = null)}
				onChange={(/** @type {any} */ value_fr) => {
					onChange({ ...activity, type: HANGMAN, value_fr });
				}}
			/>
		</div>
		<div class="act-sec">
			<h2>Hangman {FR}</h2>
			<EditHangman
				id="h2"
				value={activity?.value_nl}
				onClose={() => (selectedActivity = null)}
				onChange={(/** @type {any} */ value_nl) => {
					onChange({ ...activity, type: HANGMAN, value_nl });
				}}
			/>
		</div>
	</div>
</LightBox>

<LightBox
	title={DRAGDROP}
	isOpen={selectedActivity === DRAGDROP}
	close={() => (selectedActivity = null)}
	width="100%"
>
	<div class="act-cont">
		<div class="act-sec">
			<h2>DragDrop {EN}</h2>
			<EditDragDrop
				value={activity?.value_en}
				onClose={() => (selectedActivity = null)}
				onChange={(/** @type {any} */ value_en) => {
					onChange({ ...activity, type: DRAGDROP, value_en });
				}}
			/>
		</div>
		<div class="act-sec spacer">
			<h2>DragDrop {FR}</h2>
			<EditDragDrop
				value={activity?.value_fr}
				onClose={() => (selectedActivity = null)}
				onChange={(/** @type {any} */ value_fr) => {
					onChange({ ...activity, type: DRAGDROP, value_fr });
				}}
			/>
		</div>
		<div class="act-sec">
			<h2>DragDrop {NL}</h2>
			<EditDragDrop
				value={activity?.value_nl}
				onClose={() => (selectedActivity = null)}
				onChange={(/** @type {any} */ value_nl) => {
					onChange({ ...activity, type: DRAGDROP, value_nl });
				}}
			/>
		</div>
	</div>

	<button
		class="mt-3 flex-none create-btn w-full"
		on:click={() => {
			selectedActivity = null;
		}}>Save and Close</button
	>
</LightBox>

<LightBox
	title={ORDERLIST}
	isOpen={selectedActivity === ORDERLIST}
	close={() => (selectedActivity = null)}
	width="100%"
>
	<div class="act-cont">
		<div class="act-sec">
			<h2>OrderList {EN}</h2>
			<EditOrderList
				value={activity?.value_en}
				onClose={() => (selectedActivity = null)}
				onChange={(/** @type {any} */ value_en) => {
					// console.log('val', value);
					onChange({ ...activity, type: ORDERLIST, value_en });
				}}
			/>
		</div>
		<div class="act-sec spacer">
			<h2>OrderList {FR}</h2>
			<EditOrderList
				value={activity?.value_fr}
				onClose={() => (selectedActivity = null)}
				onChange={(/** @type {any} */ value_fr) => {
					// console.log('val', value);
					onChange({ ...activity, type: ORDERLIST, value_fr });
				}}
			/>
		</div>
		<div class="act-sec">
			<h2>OrderList {NL}</h2>
			<EditOrderList
				value={activity?.value_nl}
				onClose={() => (selectedActivity = null)}
				onChange={(/** @type {any} */ value_nl) => {
					// console.log('val', value);
					onChange({ ...activity, type: ORDERLIST, value_nl });
				}}
			/>
		</div>
	</div>
	<button
		class="mt-3 flex-none create-btn w-full"
		on:click={() => {
			selectedActivity = null;
		}}>Save and Close</button
	>
</LightBox>

<style>
	.act-sec {
		@apply flex-grow flex flex-col md:w-1/3;
	}

	.act-sec h2 {
		@apply text-xl mb-3;
	}

	.spacer {
		@apply md:py-0 md:px-3;
	}

	.act-cont {
		@apply flex w-full flex-grow flex-wrap;
	}
</style>
