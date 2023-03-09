<script>
	import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
	import { v4 as uuid } from 'uuid';
	import Img from '$lib/components/utils/Img.svelte';
	import { store } from '/src/stores/index';
	import TopicsPreview from './TopicsField.svelte';

	import ImageArea from 'svelte-material-icons/imageArea.svelte';
	import LinksField from './LinksField.svelte';

	export let title = '';
	export let description = '';
	export let img = '';
	export let activity;
	export let topics;
	export let links = [];
	export let id = '';
	export let open = false;
	export let onClose;
	export let onChange;
	export let selectedEnvId;
	export let onSubmit;
	export let actSub;

	// $: console.log('props', $$props);
</script>

<Img url={img?.url} style="height:300px" cls="mb-3" />
{#if !!topics}
	<TopicsPreview {topics} />
{/if}
{#if !!links}
	<LinksField {links} />
{/if}
{#if !!description}
	<p class="  overflow-y-auto ">
		{description}
	</p>
{/if}

<button on:click={onSubmit} class="mt-auto w-full bg-black text-white text-xl p-2">
	{#if actSub?.succeeded}
		Collected
	{:else if !!activity}
		Challenge
	{:else}
		Collect
	{/if}
</button>
