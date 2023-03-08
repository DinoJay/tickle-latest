<script>
	import { QUIZ, GEOCACHING } from '$lib/components/Admin/cards/activityConsts';
	import Quiz from '$lib/components/Card/Challenge/Quiz/index.svelte';
	import GeoCaching from '$lib/components/Card/Challenge/GeoCaching/index.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	/**
	 * @type {{ type: string | undefined; }}
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
</script>

<LightBox title={isResult ? 'Quiz Result' : activity?.type} isOpen={open} close={onClose}>
	{#if activity?.type === QUIZ}
		<Quiz {...$$props} onResult={(res) => (isResult = res)} />
	{:else if activity?.type === GEOCACHING}
		<GeoCaching {...$$props} />
	{:else}
		<div>No challenge added</div>
	{/if}
</LightBox>
