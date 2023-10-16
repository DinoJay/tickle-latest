<script>
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import EditQuiz from './EditQuiz.svelte';
	import { QUIZ, GEOCACHING, HANGMAN, DRAGDROP, ORDERLIST } from './activityConsts';
	import EditGeoCaching from './EditGeoCaching/index.svelte';
	import EditHangman from './EditHangman.svelte';
	import EditDragDrop from './EditDragDrop.svelte';
	import EditOrderList from './EditOrderList.svelte';
	import { activityLocales } from '$lib/constants/locales';
	import TabItem from '$lib/components/TabItem.svelte';
	import Tabs from '$lib/components/ResponsiveTabs.svelte';
	import { EN, FR, NL } from '$lib/constants/locales.js';

	/**
	 * @type {string[]}
	 */
	export let langs;
	/**
	 * @type {{ type: string; value_en: any; value_fr:any; value_nl:any }|null}
	 */
	export let activity_en;
	/**
	 * @type {{ type: string; value_en: any; value_fr:any; value_nl:any }|null}
	 */
	export let activity_fr;
	/**
	 * @type {{ type: string; value_en: any; value_fr:any; value_nl:any }|null}
	 */
	export let activity_nl;
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
			class="p-2 text-xl flex-grow border-2 {[
				activity_en?.type,
				activity_fr?.type,
				activity_nl?.type
			].includes(a)
				? 'bg-gray-700 text-white'
				: ''}"
			on:click={() => (selectedActivity = a)}
			>{a}
			{#if activity_en?.type === a}
				({EN})
			{:else if activity_fr?.type === a}
				({FR})
			{:else if activity_nl?.type === a}
				({NL})
			{/if}
		</button>
	{/each}
	{#if !!activity_en || !!activity_fr || !!activity_nl}
		<button class="del-btn" on:click={onRemove}>Remove Activity</button>
	{/if}
</div>

<LightBox
	title={QUIZ}
	isOpen={selectedActivity === QUIZ}
	close={() => (selectedActivity = null)}
	width="auto"
>
	<Tabs>
		{#each langs as l, i}
			<TabItem title={l}>
				<h2 class="label text-xl">Quiz {l}</h2>
				<EditQuiz
					onClose={() => (selectedActivity = null)}
					value={$$props[activityLocales(l)]?.value}
					onChange={(/** @type {any} */ value) => {
						console.log('questions', value);
						const activityField = activityLocales(l);
						onChange({ [activityField]: { type: QUIZ, value } });
					}}
				/>
			</TabItem>
		{/each}
	</Tabs>
	<button class="w-full btn mt-3 max-w-2xl mx-auto" on:click={() => (selectedActivity = null)}>
		Close
	</button>
</LightBox>

<LightBox
	title={GEOCACHING}
	isOpen={selectedActivity === GEOCACHING}
	close={() => (selectedActivity = null)}
	width="100%"
>
	<Tabs>
		{#each langs as l, i}
			<TabItem title={l}>
				<h2>GeoCaching {l}</h2>
				<EditGeoCaching
					onClose={() => (selectedActivity = null)}
					value={$$props[activityLocales(l)]?.value}
					onChange={(/** @type {any} */ value) => {
						const activityField = activityLocales(l);
						onChange({ [activityField]: { type: GEOCACHING, value } });
					}}
				/>
			</TabItem>
		{/each}
	</Tabs>
	<button class="w-full btn mt-3 m-auto" on:click={() => (selectedActivity = null)}> Close </button>
</LightBox>
<LightBox
	title={HANGMAN}
	isOpen={selectedActivity === HANGMAN}
	close={() => (selectedActivity = null)}
>
	<Tabs>
		{#each langs as l, i}
			<TabItem title={l}>
				<h2 class="text-xl label">Hangman {l}</h2>
				<EditHangman
					id="h{l}"
					value={$$props[activityLocales(l)]?.value}
					onClose={() => (selectedActivity = null)}
					onChange={(/** @type {any} */ value) => {
						const activityField = activityLocales(l);
						onChange({ [activityField]: { type: HANGMAN, value } });
					}}
				/>
			</TabItem>
		{/each}
	</Tabs>
	<button class="w-full btn mt-3 mx-auto" on:click={() => (selectedActivity = null)}>
		Close
	</button>
</LightBox>

<LightBox
	title={DRAGDROP}
	isOpen={selectedActivity === DRAGDROP}
	close={() => (selectedActivity = null)}
	width="100%"
>
	<Tabs>
		{#each langs as l, i}
			<TabItem title={l}>
				<h2 class="label text-xl">DragDrop {l}</h2>
				<EditDragDrop
					value={$$props[activityLocales(l)]?.value}
					onChange={(/** @type {any} */ value) => {
						const activityField = activityLocales(l);
						onChange({ [activityField]: { type: DRAGDROP, value } });
					}}
				/>
			</TabItem>
		{/each}
	</Tabs>
	<button
		class="mt-3 flex-none btn mx-auto w-full"
		on:click={() => {
			selectedActivity = null;
		}}>Close</button
	>
</LightBox>

<LightBox
	title={ORDERLIST}
	isOpen={selectedActivity === ORDERLIST}
	close={() => (selectedActivity = null)}
	width="100%"
	fullHeight={true}
>
	<Tabs>
		{#each langs as l, i}
			<TabItem title={l}>
				<h2 class="text-xl label">OrderList {l}</h2>
				<EditOrderList
					value={$$props[activityLocales(l)]?.value}
					onClose={() => (selectedActivity = null)}
					onChange={(/** @type {any} */ value) => {
						const activityField = activityLocales(l);
						onChange({ [activityField]: { type: ORDERLIST, value } });
					}}
				/>
			</TabItem>
		{/each}
	</Tabs>
	<button
		class="mt-3 flex-none btn mx-auto w-full"
		on:click={() => {
			selectedActivity = null;
		}}>Close</button
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
