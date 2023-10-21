<script>
	import {
		activityLocale,
		linksLocale,
		titleLocale,
		descriptionLocale,
		videosLocale
	} from './../../../stores/localizationStore.js';
	import {
		activityLocales,
		descriptionLocales,
		linksLocales,
		titleLocales,
		videosLocales
	} from './../../constants/locales.js';
	import { db } from '$lib/firebaseConfig/firebase';
	import { v4 as uuid } from 'uuid';
	// @ts-ignore
	import { store } from '/src/stores/index';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	// import Hangman from '$lib/components/Card/Challenge/Hangman/Hangman.svelte';
	import Activity from './Challenge/Activity.svelte';
	import CardFront from './CardFront.svelte';
	import CardBack from './CardBack.svelte';
	import { locale } from '/src/stores/localizationStore';
	import { doc, getDoc, setDoc } from 'firebase/firestore';

	$: uid = $store.currentUser.uid;

	export let title = '';
	/**
	 * @type {any}
	 */
	export let activity_en;
	/**
	 * @type {any}
	 */
	export let activity_fr;
	/**
	 * @type {any}
	 */
	export let activity_nl;
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
	 * @type {string|undefined}
	 */
	export let description_fr;
	/**
	 * @type {string|undefined}
	 */
	export let description_en;
	/**
	 * @type {string|undefined}
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
	export let langs;

	export let onActivitySubmit = (d) => d;

	let activityOpen = false;

	let flipped = false;

	$: activity = $$props[$activityLocale];

	$: console.log('acti', activity);
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
	$: console.log('curActSub ', curActSub);
</script>

<LightBox
	title={$$props[titleLocale] || 'No Title'}
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
			description={$$props[$descriptionLocale] || 'No Description'}
			{description_en}
			{description_fr}
			{description_nl}
			{img}
			{activity}
			{topics}
			links={$$props[$linksLocale]}
			{id}
			{open}
			{onClose}
			{onChange}
			{selectedEnvId}
			videos={$$props[$videosLocale]}
			{langs}
			actSub={curActSub}
			onSubmit={() => {
				if ($$props[$activityLocale] !== undefined) activityOpen = true;
				if (!activity) {
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
	activity={$$props[$activityLocale]}
	currentActSub={curActSub}
	onSubmit={(/** @type {any} */ respObj) => {
		const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', id, 'activitySubmissions', uid);
		const actSub = { ...activityInformation, ...respObj };
		curActSub = actSub;
		setDoc(docRef, actSub);
		console.log('ACTIVITY SUBMISSION DONE!!!', actSub);
	}}
/>
