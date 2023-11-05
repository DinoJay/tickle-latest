<script>
	import {
		activityLocale,
		langDict,
		descriptionLocale
	} from './../../../stores/localizationStore.js';
	import Img from '$lib/components/utils/Img.svelte';
	import TopicsPreview from './TopicsField.svelte';

	import LinksField from './LinksField.svelte';
	import Description from './Description.svelte';
	import VideosField from './VideosField.svelte';

	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';

	/**
	 * @type {string}
	 */
	export let description;
	/**
	 * @type {string | undefined}
	 */
	export let img = '';
	/**
	 * @type {any}
	 */
	export let topics;
	/**
	 * @type {any[]}
	 */
	export let links = [];
	/**
	 * @type {any[]}
	 */
	export let videos = [];
	/**
	 * @type {any}
	 */
	export let onSubmit;
	/**
	 * @type {object}
	 */
	export let actSub;

	export let onPrevClick;
	export let onPrevClickDisabled = false;

	export let onNextClick;
	export let onNextClickDisabled = false;

	$: console.log('actSub', actSub);

	$: console.log('activity', activity);

	$: activity = $$props[$activityLocale];
</script>

<div class="flex-grow overflow-auto">
	<Img url={img?.url} style="min-height:250px" cls="mb-3 flex-none" />
	{#if !!topics}
		<TopicsPreview cls="mb-2" {topics} />
	{/if}
	{#if !!links && links.length > 0}
		<LinksField cls="mb-2" {links} />
	{/if}
	{#if !!videos && videos.length > 0}
		<VideosField cls="mb-2" {videos} />
	{/if}
	<div class="mb-3 flex flex-1">
		<Description cls="flex-initial h-64" description={$$props[$descriptionLocale]} />
	</div>
</div>
<div class="mt-auto flex">
	{#if onPrevClick}
		<button class:disabled={onPrevClickDisabled} on:click={onPrevClick} class="sel-btn mr-1"
			><ChevronLeft size={30} /></button
		>
	{/if}
	<button on:click={onSubmit} class="w-full bg-gray-700 text-white text-xl p-2">
		{#if actSub?.succeeded}
			{$langDict.card.collected}
			{#if !!activity?.type}
				{activity.type}
			{/if}
		{:else if !!activity}
			{$langDict.challenge}: {activity.type}
		{:else if !activity}
			{$langDict.card.collect}
		{/if}
	</button>
	{#if onNextClick}
		<button class:disabled={onNextClickDisabled} on:click={onNextClick} class="sel-btn ml-1"
			><ChevronRight size={30} /></button
		>
	{/if}
</div>
