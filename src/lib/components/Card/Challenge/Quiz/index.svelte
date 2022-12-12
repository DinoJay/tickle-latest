<script>
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Quiz from './Quiz.svelte';
	export let onSubmit;
	export let activity;
	export let onClose;
	export let open;
	let responses = {};
</script>

<Quiz
	{...$$props}
	{responses}
	onAnswerSubmit={(resp) => {
		responses = { ...responses, [resp.qid]: resp.answer };
		onSubmit(responses);
	}}
/>
