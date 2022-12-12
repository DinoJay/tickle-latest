<script>
	import EditQuestion from './EditQuestion.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import EditNewQuestion from './EditNewQuestion.svelte';
	import Logo from '$lib/components/navigationBar/Logo.svelte';

	export let questions = [];
	export let onChange;

	let sq = false;

	let selQIndex = null;

	$: selQ = questions[selQIndex];

	const onQuestionAdd = (q) => onChange([...questions, q]);
	const onQuestionChange = (q) => {
		const nqs = questions.map((d) => {
			if (q.id === d.id) {
				return q;
			}
			return d;
		});
		onChange(nqs);
	};
	const onQuestionRemove = (id) => {
		const nqs = questions.filter((d) => {
			return id !== d.id;
		});
		console.log('nqs', nqs);
		onChange(nqs);
	};
	console.log('questions', questions);
</script>

<div class="flex flex-col w-full  flex-grow overflow-y-auto  ">
	{#if questions.length === 0}
		<div class="m-auto text-xl text-gray-500">No Questions added!</div>
	{/if}
	{#each questions as q, i}
		<button
			class="crop p-2 border-2 mb-1"
			on:click={() => {
				selQIndex = i;
			}}
		>
			<span class="font-bold">Q{i + 1}:</span><span class="ml-1">{q.text}</span>
		</button>
	{/each}
</div>
<button class="w-full border-2 mt-auto p-2" on:click={() => (sq = true)}> Add a question </button>

<EditNewQuestion
	onCreate={(q) => {
		onQuestionAdd({ ...q, id: uuidv4() });
		sq = false;
	}}
	open={sq}
	onClose={() => (sq = false)}
/>

<EditQuestion
	q={selQ}
	open={selQIndex !== null}
	onChange={onQuestionChange}
	onRemove={(id) => {
		onQuestionRemove(id);
		selQIndex = null;
	}}
	onClose={() => (selQIndex = null)}
/>
