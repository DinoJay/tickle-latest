<script>
	import Check from 'svelte-material-icons/Check.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import EditQuiz from './EditQuiz.svelte';
	import { QUIZ, GEOCACHING, HANGMAN } from './activityConsts';

	export let activity;
	export let onChange;

	const ACTIVITIES = [QUIZ, GEOCACHING, HANGMAN];

	/**
	 * @type {string | null}
	 */
	let selectedActivity = null;
</script>

<div class="flex flex-wrap gap-2">
	{#each ACTIVITIES as a}
		<button
			class="p-2 text-xl border-2 {activity?.type === a ? 'bg-gray-500 text-white' : ''}"
			on:click={() => (selectedActivity = a)}>{a}</button
		>
	{/each}
</div>

<LightBox isOpen={selectedActivity === QUIZ} close={() => (selectedActivity = null)}>
	<EditQuiz
		{activity}
		questions={activity?.value}
		onChange={(questions) => onChange({ type: QUIZ, value: questions })}
	/>
</LightBox>

<LightBox
	height={null}
	isOpen={selectedActivity === GEOCACHING}
	close={() => (selectedActivity = null)}
>
	<div>Not yet implemented</div>
</LightBox>
<LightBox
	height={null}
	isOpen={selectedActivity === HANGMAN}
	close={() => (selectedActivity = null)}
>
	<div>Not yet implemented</div>
</LightBox>
