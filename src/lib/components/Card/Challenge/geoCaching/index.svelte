<script>
	import GeoCaching from './GeoCaching.svelte';

	/**
	 * @type {(arg0: { response: { answer: string | null; imgUrl: string | null; }; }) => void}
	 */
	export let onSubmit;

	export let currentActSub;

	$: console.log('props GEOCACHING', $$props);
	// $: console.log('currentActSub', currentActSub?.response);
</script>

<GeoCaching
	{...$$props}
	userResponse={currentActSub?.response}
	onSubmit={(obj) => {
		console.log('obj', obj);
		const userResponse = { ...(currentActSub?.response || {}), ...obj };
		onSubmit({ response: userResponse });
	}}
/>
