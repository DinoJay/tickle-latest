<script>
	import { langDict } from './../../../../stores/localizationStore.js';
	import {
		QUIZ,
		GEOCACHING,
		HANGMAN,
		DRAGDROP,
		ORDERLIST
	} from '$lib/components/Admin/cards/activityConsts';
	import Quiz from '$lib/components/Card/Challenge/Quiz/index.svelte';
	import GeoCaching from '$lib/components/Card/Challenge/GeoCaching/index.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Hangman from './Hangman/index.svelte';
	import DragDrop from './DragDrop/index.svelte';
	import OrderList from './OrderList/index.svelte';

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

	$: console.log('activity ACT', $$props);

	$: setTitle = () => {
		if (activity?.type === QUIZ)
			return isResult ? $langDict.quiz.result : activity?.value?.title || 'Quiz';
		if (activity?.type === GEOCACHING) return activity?.value?.title;
		if (activity?.type === DRAGDROP) return $langDict.dragdrop.title;
		if (activity?.type === ORDERLIST) return $langDict.reorder_list.title;
		if (activity?.type === HANGMAN) return $langDict.hangman.title;
	};
</script>

<LightBox fixedWidth={true} fixedHeight={true} title={setTitle()} isOpen={open} close={onClose}>
	{#if activity?.type === QUIZ}
		<Quiz {...$$props} onResult={(res) => (isResult = res)} />
	{:else if activity?.type === GEOCACHING}
		<GeoCaching {...$$props} />
	{:else if activity?.type === HANGMAN}
		<Hangman {...$$props} />
	{:else if activity?.type === DRAGDROP}
		<DragDrop {...$$props} />
	{:else if activity?.type === ORDERLIST}
		<OrderList {...$$props} />
	{/if}
</LightBox>
