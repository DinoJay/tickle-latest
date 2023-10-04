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
	import { EN, FR, NL, activityValueLocales } from '$lib/constants/locales';

	/**
	 * @type {string[]}
	 */
	export let langs;
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
		{#each langs as l, i}
			<div class="act-sec" class:spacer={langs.length > 1 && i === 1}>
				<h2>Quiz {l}</h2>
				<EditQuiz
					onClose={() => (selectedActivity = null)}
					value={activity?.[activityValueLocales[l]]}
					onChange={(/** @type {any} */ questions) => {
						console.log('QUIZ value', questions);
						onChange({ ...activity, type: QUIZ, [activityValueLocales[l]]: questions });
					}}
				/>
			</div>
		{/each}
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
		{#each langs as l, i}
			<div class:spacer={langs.length > 1 && i === 1} class="act-sec">
				<h2>GeoCaching {l}</h2>
				<EditGeoCaching
					onClose={() => (selectedActivity = null)}
					value={activity?.value_en}
					onChange={(/** @type {any} */ value) =>
						onChange({ ...activity, type: GEOCACHING, [activityValueLocales[l]]: value })}
				/>
			</div>
		{/each}
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
		{#each langs as l, i}
			<div class:spacer={langs.length > 1 && i === 1} class="act-sec">
				<h2>Hangman {l}</h2>
				<EditHangman
					id="h0"
					value={activity?.value_en}
					onClose={() => (selectedActivity = null)}
					onChange={(/** @type {any} */ value) => {
						onChange({ ...activity, type: HANGMAN, [activityValueLocales[l]]: value });
					}}
				/>
			</div>
		{/each}
	</div>
	<button
		class="mt-3 flex-none create-btn w-full"
		on:click={() => {
			selectedActivity = null;
		}}>Save and Close</button
	>
</LightBox>

<LightBox
	title={DRAGDROP}
	isOpen={selectedActivity === DRAGDROP}
	close={() => (selectedActivity = null)}
	width="100%"
>
	<div class="act-cont">
		{#each langs as l, i}
			<div class:spacer={langs.length > 1 && i === 1} class="act-sec">
				<h2>DragDrop {l}</h2>
				<EditDragDrop
					value={activity?.value_en}
					onClose={() => (selectedActivity = null)}
					onChange={(/** @type {any} */ value) => {
						onChange({ ...activity, type: DRAGDROP, [activityValueLocales[l]]: value });
					}}
				/>
			</div>
		{/each}
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
		{#each langs as l, i}
			<div class:spacer={langs.length > 1 && i === 1} class="act-sec">
				<h2>OrderList {EN}</h2>
				<EditOrderList
					value={activity?.value_en}
					onClose={() => (selectedActivity = null)}
					onChange={(/** @type {any} */ value) => {
						// console.log('val', value);
						onChange({ ...activity, type: ORDERLIST, [activityValueLocales[l]]: value });
					}}
				/>
			</div>
		{/each}
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
