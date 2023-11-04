<script>
	import { langDict } from './../../../../../stores/localizationStore.js';
	export let questions = [];
	export let title = '';

	export let responses;
	export let succeeded;
</script>

<div class=" p-3 overflow-y-auto bg-white">
	{#each questions as q, i}
		<div class={i < questions.length ? 'mb-3' : ''}>
			<p class="text-lg">{q.text}</p>
			<div class="ml-6">
				{#each q.answers as a}
					<div class="flex items-center">
						<div class="mr-1">{a.text}</div>
						<div class="text-lg {responses[q.id][a.text] ? 'text-green-600' : 'text-red-600'}">
							{responses[q.id][a.text] ? '(✓)' : '(x)'}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
	<div class="text-lg">
		{#if succeeded}
			{$langDict.quiz.succeeded}
		{:else}
			{$langDict.quiz.failed}
			You failed the quiz and did not collect the card!
		{/if}
	</div>
</div>
