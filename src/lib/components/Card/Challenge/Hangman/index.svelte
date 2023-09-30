<script>
	import Hangman from './Hangman.svelte';

	/**
	 * @type {string}
	 */
	export let actValAcc;
	/**
	 * @type {{ value: { word: any; hint: any; }; }}
	 */
	export let activity = { [actValAcc]: { word: '', hint: '' } };
	export let currentActSub = { response: { wordList: [] } };
	/**
	 * @type {(arg0: { response: { wordList: { letter: any; visible: boolean; }[]; }; succeeded: boolean; }) => void}
	 */
	export let onSubmit;
	$: console.log('activity HANG', activity, 'props', $$props);

	const word = activity[actValAcc].word;
	const hint = activity[actValAcc].hint;
	let errors = 0;

	let wordList = [...word].map((c) => {
		return {
			letter: c,
			visible: false
		};
	});
	let succeeded = false;

	// $: console.log('word', word, wordList);
	// $: console.log('value', $$props);
</script>

<Hangman
	{wordList}
	{hint}
	{errors}
	{succeeded}
	onChange={(resp) => {
		wordList = resp.wordList;
		if (resp.error) errors = errors + 1;
		const userResponse = { ...currentActSub.response, wordList };

		const won = wordList.every((w) => w.visible) && errors < 5;
		succeeded = won;
		onSubmit({ response: userResponse, succeeded });
	}}
/>
