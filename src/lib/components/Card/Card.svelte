<script>
	import { onMount } from 'svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { v4 as uuid } from 'uuid';
	import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
	import { store } from '/src/stores/index';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Quiz from '$lib/components/Card/Challenge/Quiz/index.svelte';
	// import Hangman from '$lib/components/Card/Challenge/Hangman/Hangman.svelte';
	import GeoCatching from './Challenge/geoCaching/geoCaching.svelte';
	import Activity from './Challenge/Activity.svelte';

	export let title = '';
	export let description = '';
	export let img = '';
	export let activity;
	export let links = [];
	export let id = '';
	export let envId = '';
	export let open = false;
	export let onClose;
	export let onChange;
	export let selectedEnvId;

	let activityOpen = false;

	$: uid = $store.currentUser.uid;
	$: activityInformation = {
		id: uuid(),
		completed: false,
		date: new Date().getTime(),
		cardId: id,
		envId: envId,
		type: activity?.type || null,
		succeeded: false,
		uid,
		score: 0,
		maxScore: 0
	};

	$: console.log('activity', activity);
	$: console.log('links', links);
	let curActSub = null;
	$: {
		if (!!id && !curActSub) {
			const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', id, 'activitySubmissions', uid);
			getDoc(docRef).then((snap) => (curActSub = snap.data()));
		}
	}
</script>

<LightBox {title} isOpen={open} close={onClose} cls="flex-grow flex flex-col overflow-y-auto">
	<img src={img?.url} alt={title} class="w-full mb-3 object-contain " style="height:300px" />
	<p class="max-h-32 mb-3 overflow-y-auto ">
		{description}
	</p>
	{#if links}
		<div>
			{#each links as l}
				<div><a target="_blank" class="text-blue-500" href={l}>{l}</a></div>
			{/each}
		</div>
	{/if}
	<button
		on:click={() => {
			if (!!activity) activityOpen = true;
			else {
				const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', id, 'activitySubmissions', uid);
				const actSub = { ...activityInformation, succeeded: true, response: null };
				console.log('submit', actSub);
				setDoc(docRef, actSub);
				curActSub = actSub;
			}
		}}
		class="mt-auto w-full bg-black text-white text-xl p-2"
	>
		{#if !!curActSub}
			Collected
		{:else if !!activity}
			Challenge
		{:else}
			Collect
		{/if}
	</button>
</LightBox>

<Activity
	open={activityOpen}
	onClose={() => {
		activityOpen = false;
	}}
	{activity}
	onSubmit={(response) => {
		const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', id, 'activitySubmissions', uid);
		const ac = { ...activityInformation, succeeded: true, response };
		curActSub = ac;
		setDoc(docRef, ac);
	}}
/>
