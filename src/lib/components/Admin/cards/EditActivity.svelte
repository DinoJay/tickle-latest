<script>
	import Check from 'svelte-material-icons/Check.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import EditQuiz from './EditQuiz.svelte';
	import { QUIZ, GEOCACHING, HANGMAN } from './activityConsts';
	import EditGeoCaching from './EditGeoCaching/index.svelte';

	/**
	 * @type {{ type: string; value: any; }}
	 */
	export let activity;
	/**
	 * @type {(arg0: { type: string; value: any; }) => any}
	 */
	export let onChange;
	/**
	 * @type {any}
	 */
	export let onRemove;

	const ACTIVITIES = [QUIZ, GEOCACHING, HANGMAN];

	/**
	 * @type {string | null}
	 */
	let selectedActivity = null;
</script>

<div class="flex flex-col gap-2 flex-grow">
	{#each ACTIVITIES as a}
		<button
			class="p-2 text-xl flex-grow border-2 {activity?.type === a ? 'bg-gray-400 text-white' : ''}"
			on:click={() => (selectedActivity = a)}>{a}</button
		>
	{/each}
	{#if !!activity}
		<button class="del-btn" on:click={onRemove}>Remove Activity</button>
	{/if}
</div>

<LightBox
	cls="flex-grow"
	isOpen={selectedActivity === QUIZ}
	close={() => (selectedActivity = null)}
>
	<EditQuiz
		{activity}
		questions={activity?.value}
		onChange={(questions) => onChange({ type: QUIZ, value: questions })}
	/>
</LightBox>

<LightBox
	title={activity?.value?.title || GEOCACHING}
	isOpen={selectedActivity === GEOCACHING}
	close={() => (selectedActivity = null)}
>
	<EditGeoCaching
		value={activity?.value}
		onChange={(/** @type {any} */ value) => onChange({ type: GEOCACHING, value })}
	/>
</LightBox>
<LightBox isOpen={selectedActivity === HANGMAN} close={() => (selectedActivity = null)}>
	<div>Not yet implemented</div>
</LightBox>
