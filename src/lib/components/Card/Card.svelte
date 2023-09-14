<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { v4 as uuid } from 'uuid';
	import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
	// @ts-ignore
	import { store } from '/src/stores/index';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Quiz from '$lib/components/Card/Challenge/Quiz/index.svelte';
	// import Hangman from '$lib/components/Card/Challenge/Hangman/Hangman.svelte';
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
	 * @type {any|undefined}
	 */
	export let description_fr;
	/**
	 * @type {any|undefined}
	 */
	export let description_en;
	/**
	 * @type {any|undefined}
	 */
	export let description_nl;
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

	export let videos;

	export let onActivitySubmit = (d) => d;

	let activityOpen = false;

	let flipped = false;

	$: activityInformation = {
		id: uuid(),
		date: new Date().getTime(),
		cardId: id,
		envId: selectedEnvId,
		type: activity?.type || null,
		succeeded: false,
		uid
	};

	/**
	 * @type {import("@firebase/firestore").DocumentData | null | undefined}
	 */
	let curActSub = null;
	$: {
		if (!!id && !curActSub) {
			const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', id, 'activitySubmissions', uid);
			getDoc(docRef).then((snap) => (curActSub = snap.data()));
		}
	}
	// $: console.log('card props', $$props);
</script>

<LightBox
	{title}
	{flipped}
	isOpen={open}
	close={() => {
		onClose();
		flipped = false;
	}}
	onFlip={() => (flipped = !flipped)}
>
	<!-- <div class=" flex flex-col" slot="front"> -->
	<div slot="front" class=" flex-grow flex flex-col overflow-y-auto">
		<CardFront
			{description}
			{description_en}
			{description_fr}
			{description_nl}
			{img}
			{activity}
			{topics}
			{links}
			{id}
			{open}
			{onClose}
			{onChange}
			{selectedEnvId}
			{videos}
			actSub={curActSub}
			onSubmit={() => {
				if (!!activity) activityOpen = true;
				else {
					const docRef = doc(
						db,
						'card-envs',
						selectedEnvId,
						'cards',
						id,
						'activitySubmissions',
						uid
					);
					const succeeded = !curActSub?.succeeded;
					const actSub = {
						...activityInformation,
						...(curActSub || {}),
						succeeded,
						response: null
					};
					setDoc(docRef, actSub);
					// console.log('submit', actSub);
					curActSub = actSub;
					onActivitySubmit(actSub);
				}
			}}
		/>
	</div>
	<div slot="back" class="w-full h-full flex flex-col">
		<CardBack {selectedEnvId} cardId={id} {uid} />
	</div>
</LightBox>

<Activity
	open={activityOpen}
	onClose={() => {
		activityOpen = false;
	}}
	{activity}
	currentActSub={curActSub}
	onSubmit={(/** @type {any} */ respObj) => {
		const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', id, 'activitySubmissions', uid);
		const actSub = { ...activityInformation, ...respObj };
		curActSub = actSub;
		setDoc(docRef, actSub);
		console.log('ACTIVITY SUBMISSION DONE!!!', actSub);
	}}
/>
