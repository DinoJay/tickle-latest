<script>
	import { QUIZ, GEOCACHING } from '$lib/components/Admin/cards/activityConsts';
	import Quiz from '$lib/components/Card/Challenge/Quiz/index.svelte';
	import GeoCaching from '$lib/components/Card/Challenge/GeoCaching/index.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	/**
	 * @type {{ type: string | undefined; value: any;}}
	 */
	export let activity;
	/**
	 * @type {boolean}
	 */
	export let open;
	/**
	 * @type {any}
	 */
	export let onClose;

	let isResult = false;

	$: console.log('activity', activity);

	$: setTitle = () => {
		if (activity?.type === QUIZ) return isResult ? 'Quiz Result' : activity?.value?.title;
		if (activity?.type === GEOCACHING) return activity?.value?.title;
	};
</script>

<LightBox title={setTitle()} isOpen={open} close={onClose}>
	{#if activity?.type === QUIZ}
		<Quiz {...$$props} onResult={(res) => (isResult = res)} />
	{:else if activity?.type === GEOCACHING}
		<GeoCaching {...$$props} />
	{:else}
		<div>No challenge added</div>
	{/if}
</LightBox>
