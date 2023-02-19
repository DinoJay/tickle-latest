<script>
	import Question from './Question.svelte';
	import Result from './Result.svelte';

	export let activity;
	export let onAnswerSubmit;
	export let responses;
	export let onResult;
	export let succeeded;

	// console.log('activity', activity);

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

<div class="flex flex-col cont bg-white">
	{#if counter < questions.length}
		{#key curQ.id}
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
					Next Question
				{:else}
					See Result
				{/if}
			</button>
		{/key}
	{:else}
		<Result {questions} {responses} {title} {succeeded} />
	{/if}
</div>

<style>
	.cont {
		width: 100vw;
		max-width: 400px;
		height: 100vh;
		max-height: 600px;
	}
</style>
