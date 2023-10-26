<script>
	import { flip } from 'svelte/animate';
	import FlipCard from './../../Card/FlipCard.svelte';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import TurnIcon from 'svelte-material-icons/ArrowULeftTop.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import EditCardBack from './EditCardBack.svelte';
	import EditCardFront from './EditCardFront.svelte';
	import { titleLocales } from '$lib/constants/locales';

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

	export let height;
	export let width;
	export let backCls;
	export let cls;

	export let currentCard;

	let titleExpanded = false;
	export let flipped = false;
	export let selLang;

	const maxCardWidth = 450;
	const maxCardHeight = 700;

	$: titleKey = titleLocales[selLang];
</script>

<FlipCard
	style="max-width:{maxCardWidth}px;max-height:{maxCardHeight}px"
	cls="drop-shadow-xl w-full h-full m-auto "
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
					{currentCard[titleKey]}
				</h1>
			</div>
			<button on:click={() => (flipped = !flipped)} class=" ml-auto">
				<TurnIcon size="1.5em" />
			</button>
			<button on:click={onClose} class="ml-3">
				<WindowClose size="1.5em" />
			</button>
		</div>
		<EditCardFront {...$$props} />
	</div>
	<div slot="back" class={`${backCls} bg-white flex flex-col h-full w-full p-3 max-h-full`}>
		<div class=" flex mb-3">
			<div class="text-xl crop uppercase" style="max-width:90%">{currentCard[titleKey]}</div>
			<button on:click={() => (flipped = !flipped)} class=" ml-auto">
				<TurnIcon size="1.5em" />
			</button>
			<button on:click={onClose} class="ml-3">
				<WindowClose size="1.5em" />
			</button>
		</div>
		<EditCardBack {...$$props} cardId={currentCard.id} />
	</div>
</FlipCard>
