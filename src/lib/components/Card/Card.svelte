<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { v4 as uuid } from 'uuid';
	import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
	// @ts-ignore
	import { store } from '/src/stores/index';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Quiz from '$lib/components/Card/Challenge/Quiz/index.svelte';
	// import Hangman from '$lib/components/Card/Challenge/Hangman/Hangman.svelte';
	import GeoCatching from './Challenge/geoCaching/geoCaching.svelte';
	import Activity from './Challenge/Activity.svelte';
	import CardFront from './CardFront.svelte';
	import CardBack from './CardBack.svelte';

	$: uid = $store.currentUser.uid;

	export let title = '';
	/**
	 * @type {any}
	 */
	export let activity;
	export let id = '';
	export let open = false;
	/**
	 * @type {any}
	 */
	export let onClose;
	/**
	 * @type {string}
	 */
	export let selectedEnvId;
	/**
	 * @type {any}
	 */
	export let description;
	/**
	 * @type {any}
	 */
	export let img;
	/**
	 * @type {any}
	 */
	export let topics;
	/**
	 * @type {any}
	 */
	export let links;
	/**
	 * @type {any}
	 */
	export let envId;
	/**
	 * @type {any}
	 */
	export let onChange;

	let activityOpen = false;

	let flipped = false;

	$: console.log('user', $store.user);
</script>

<LightBox
	{title}
	{flipped}
	isOpen={open}
	close={onClose}
	onFlip={() => (flipped = !flipped)}
	cls="flex-grow overflow-y-auto"
>
	<!-- <div class=" flex flex-col" slot="front"> -->
	<div slot="front" class=" flex-grow flex flex-col overflow-y-auto">
		<CardFront
			{title}
			{description}
			{img}
			{activity}
			{topics}
			{links}
			{id}
			{open}
			{onClose}
			{onChange}
			{selectedEnvId}
		/>
	</div>
	<div slot="back" class="w-full h-full">
		<CardBack {selectedEnvId} cardId={id} {uid} />
	</div>
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
