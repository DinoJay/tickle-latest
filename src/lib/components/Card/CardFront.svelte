<script>
	import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
	import { v4 as uuid } from 'uuid';
	import { db } from '$lib/firebaseConfig/firebase';
	import { store } from '/src/stores/index';
	import TopicsPreview from './TopicsField.svelte';

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
</script>

<img src={img?.url} alt={title} class="w-full mb-3 object-contain " style="height:300px" />
<TopicsPreview {topics} />
<p class="  overflow-y-auto ">
	{description}
</p>
{#if links}
	<div class="mb-3 mt-3">
		{#each links as l}
			<div><a target="_blank" class="text-blue-500" href={l?.ref}>{l?.name}</a></div>
		{/each}
	</div>
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
