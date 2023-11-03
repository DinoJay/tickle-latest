<script>
	import {
		activityLocale,
		linksLocale,
		titleLocale,
		descriptionLocale,
		videosLocale
	} from '../../../stores/localizationStore.js';

	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import TurnIcon from 'svelte-material-icons/ArrowULeftTop.svelte';
	import {
		activityLocales,
		descriptionLocales,
		linksLocales,
		titleLocales,
		videosLocales
	} from '../../constants/locales.js';
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
	import FlipCard from './FlipCard.svelte';

	$: uid = $store.currentUser.uid;

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
	export let id;
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

	export let height;
	export let width;
	export let backCls;
	export let cls;
	export let style = '';

	let activityOpen = false;

	let flipped = false;

	let titleExpanded = false;

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
	const maxCardWidth = 450;
	const maxCardHeight = 700;

	const onFlip = () => {
		flipped = !flipped;
	};
	$: title = $$props[$titleLocale];
</script>

<FlipCard
	style="max-width:{maxCardWidth}px;max-height:{maxCardHeight}px;{style}"
	cls="drop-shadow-xl w-full h-full {cls}"
	{flipped}
>
	<div
		slot="front"
		class="bg-white h-full w-full flex flex-col p-3 max-h-full"
		on:keydown={() => null}
		on:click={(e) => e.stopPropagation()}
	>
		<div class=" flex mb-3 items-start">
			<div
				class="text-xl flex transition uppercase cursor-pointer"
				class:crop={!titleExpanded}
				on:click={() => (titleExpanded = !titleExpanded)}
				on:keydown={() => (titleExpanded = !titleExpanded)}
				style="max-width:90%"
			>
				<h1>
					{title}
				</h1>
			</div>
			<button on:click={onFlip} class=" ml-auto">
				<TurnIcon size="1.5em" />
			</button>
			<button on:click={onClose} class="ml-3">
				<WindowClose size="1.5em" />
			</button>
		</div>
		<CardFront
			{...$$props}
			actSub={curActSub}
			onSubmit={() => {
				if ($$props[$activityLocale] !== undefined) activityOpen = true;
				console.log('yeah');
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
				}
			}}
		/>
	</div>
	<div slot="back" class={`${backCls} bg-white flex flex-col h-full w-full p-3 max-h-full`}>
		<div class=" flex mb-3">
			<div class="text-xl crop uppercase" style="max-width:90%">{title}</div>
			<button on:click={onFlip} class=" ml-auto">
				<TurnIcon size="1.5em" />
			</button>
			<button on:click={onClose} class="ml-3">
				<WindowClose size="1.5em" />
			</button>
		</div>
		<CardBack {...$$props} cardId={id} />
	</div>
</FlipCard>

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
