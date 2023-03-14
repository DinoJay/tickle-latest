<script>
	import Hangman from './Hangman.svelte';

	/**
	 * @type {{ value: { word: any; hint: any; }; }}
	 */
	export let activity = { value: { word: '', hint: '' } };
	export let currentActSub = { response: { wordList: [] } };
	/**
	 * @type {(arg0: { response: { wordList: { letter: any; visible: boolean; }[]; }; succeeded: boolean; }) => void}
	 */
	export let onSubmit;
	$: console.log('activity HANG', activity, 'props', $$props);

	const word = activity.value.word;
	const hint = activity.value.hint;

	let wordList = [...word].map((c) => {
		return {
			letter: c,
			visible: false
		};
	});

	// $: console.log('word', word, wordList);
	// $: console.log('value', $$props);
</script>

<Hangman
	{wordList}
	{hint}
	onChange={(wl) => {
		wordList = wl;
		const userResponse = { ...currentActSub.response, wordList };

		const succeeded = wordList.every((w) => w.visible);
		onSubmit({ response: userResponse, succeeded });
	}}
/>
