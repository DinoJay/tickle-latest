<script>
	import { locale } from 'svelte-i18n';
	import Question from './Question.svelte';
	import Quiz from './Quiz.svelte';
	import { activityValueLocales } from '$lib/constants/locales';
	/**
	 * @type {(arg0: {}) => void}
	 */
	export let onSubmit;
	/**
	 * @type {any}
	 */
	export let activity;
	export let onClose;
	export let open;
	/**
	 * @type {string}
	 */
	export let actValAcc;

	let quizResponses = {};
	let succeeded = false;
	$: qs = activity[actValAcc];

	const responseSucceeded = (qs, responses) => {
		const succeeded = qs
			.map((q) =>
				q.answers.map((a) => {
					if (!responses[q.id]) return false;
					const resp = responses[q.id][a.text];
					console.log('resp', resp, 'answer', a);
					return a.correct === resp;
				})
			)
			.map((a) => a.every((d) => d))
			.every((d) => d);

		return succeeded;
	};
</script>

<Quiz
	{...$$props}
	responses={quizResponses}
	{succeeded}
	onAnswerSubmit={(/** @type {{ qid: any; answer: any; }} */ resp) => {
		console.log('qs', qs);
		quizResponses = { ...quizResponses, [resp.qid]: resp.answer };
		succeeded = responseSucceeded(qs, quizResponses);
		const userResponse = { succeeded, response: quizResponses };
		onSubmit(userResponse);
	}}
/>
