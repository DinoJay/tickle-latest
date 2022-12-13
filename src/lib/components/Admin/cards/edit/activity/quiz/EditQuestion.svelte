<script>
	// import EditText from '$lib/components/Admin/utils/edit/EditText.svelte';

	export let question = {};
	export let saveActivity = () => {};

	const addAnswer = () => {
		let id = Math.random().toString(16).slice(2);
		question.answers = [...question.answers, { text: 'none', correct: false, id: id }];
	};

	const removeAnswer = (answer) => {
		question.answers.splice(question.answers.indexOf(answer), 1);
		question.answers = [...question.answers];
	};
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	<input bind:value={question.text} on />
	<!-- <EditText labelName={'Title'} labelFor={'title'} bind:bindValue={question.text} /> -->

	<!-- <EditImage
		labelName={'Image'}
		labelFor={'image'}
		bindObject={question.img}
		onInput={() => saveActivity()}
	/> -->

	<div class="flex flex-col h-[30%] w-full mt-auto border border-c-gray">
		{#each question.answers as answer}
			<div class="flex h-10 w-full bg-c-light-gray mb-1">
				<input
					type="text"
					class="h-full w-[80%] px-1 overflow-auto bg-c-light-gray"
					bind:value={answer.text}
				/>
				<input type="checkbox" class="h-auto w-[7%] mx-1" bind:checked={answer.correct} />
			</div>
		{/each}
	</div>

	<button
		class="h-[8%] w-full 
            bg-c-light-gray hover:bg-c-gray"
		on:click={() => addAnswer()}
	>
		Add an answer
	</button>
</div>
