<script>
	import { QUIZ } from '$lib/components/Admin/cards/activityConsts';
	import Quiz from '$lib/components/Card/Challenge/Quiz/index.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	export let type;
	export let activity;
	export let open;
	export let onClose;

	let isResult = false;

	$: console.log('activity', activity);
</script>

<LightBox title={isResult ? 'Quiz Result' : activity?.type} isOpen={open} close={onClose}>
	{#if activity?.type === QUIZ}
		<Quiz {...$$props} onResult={(res) => (isResult = res)} />
	{:else if !!activity?.type}
		<div>Not implemented yet</div>
	{:else}
		<div>No challenge added</div>
	{/if}
</LightBox>
