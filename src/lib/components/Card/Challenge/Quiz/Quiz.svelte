<script>
	import { langDict } from '../../../../../stores/localizationStore';
	import Question from './Question.svelte';
	import Result from './Result.svelte';
	import { fade } from 'svelte/transition';

	export let activity;
	export let onAnswerSubmit;
	export let responses;
	export let onResult;
	export let succeeded;
	export let actValAcc;

	// console.log('activity', activity);

	console.log('actValAcc', actValAcc, { activity });

	const questions = activity.value;
	const title = activity.value.title;

	$: counter = 0;
	$: curQ = questions[counter];
	$: img = curQ?.img;

	$: disabledNextQ = !curQ || !responses[curQ.id];

	$: {
		if (counter === questions.length) {
			onResult(true);
		}
	}
</script>

{#if counter < questions.length}
	{#key curQ.id}
		<div class="flex-grow flex flex-col">
			<Question
				{title}
				{img}
				{...curQ}
				onChange={(answer) => {
					onAnswerSubmit({ qid: curQ.id, answer });
				}}
				{counter}
			/>

			<button
				class="w-full mt-auto bg-black
			 	text-xl p-3 text-white {disabledNextQ ? 'disabled' : ''}"
				disabled={disabledNextQ}
				on:click={() => {
					counter++;
				}}
			>
				{#if counter < questions.length - 1}
					{$langDict.quiz.next_question}
				{:else}
					{$langDict.quiz.see_result}
				{/if}
			</button>
		</div>
	{/key}
{:else}
	<Result {questions} {responses} {title} {succeeded} />
{/if}

<style>
</style>
