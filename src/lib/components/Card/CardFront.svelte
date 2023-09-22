<script>
	import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
	import { v4 as uuid } from 'uuid';
	import Img from '$lib/components/utils/Img.svelte';
	import { store } from '/src/stores/index';
	import TopicsPreview from './TopicsField.svelte';

	import ImageArea from 'svelte-material-icons/imageArea.svelte';
	import LinksField from './LinksField.svelte';
	import Description from './Description.svelte';
	import VideosField from './VideosField.svelte';

	/**
	 * @type {string}
	 */
	export let description;
	/**
	 * @type {string}
	 */
	export let description_en;
	/**
	 * @type {string}
	 */
	export let description_fr;
	/**
	 * @type {string}
	 */
	export let description_nl;
	export let img = '';
	/**
	 * @type {{ type: string | undefined; }}
	 */
	export let activity;
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
	 * @type {{ succeeded: boolean; }}
	 */
	export let actSub;

	const [EN, FR, NL] = ['en', 'fr', 'nl'];

	let selLang = EN;

	$: console.log('videos', videos);
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
		<div class="flex flex-col gap-2 mr-3">
			{#if !!description_en || !!description}
				<button class="btn flex-1" class:sel-btn={selLang === EN} on:click={() => (selLang = EN)}
					>EN</button
				>
			{/if}
			{#if !!description_fr}
				<button class="btn flex-1" class:sel-btn={selLang === FR} on:click={() => (selLang = FR)}
					>FR</button
				>
			{/if}
			{#if !!description_nl}
				<button class="btn flex-1" class:sel-btn={selLang === NL} on:click={() => (selLang = FR)}
					>NL</button
				>
			{/if}
		</div>
		<Description
			cls="flex-initial h-64"
			{selLang}
			{NL}
			{EN}
			{FR}
			description_en={description_en || description}
			{description_fr}
			{description_nl}
		/>
	</div>
</div>
<button on:click={onSubmit} class="mt-auto w-full bg-black text-white text-xl p-2">
	{#if actSub?.succeeded}
		Collected {#if activity?.type !== undefined}
			{activity.type}
		{/if}
	{:else if !!activity}
		Challenge: {activity.type}
	{:else}
		Collect
	{/if}
</button>
