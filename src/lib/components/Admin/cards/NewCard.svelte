<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc } from 'firebase/firestore';
	import { v4 as uuidv4 } from 'uuid';
	import EditCardFront from './EditCardFront.svelte';
	import { titleLocales } from '$lib/constants/locales';

	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	export let selectedEnvId;
	export let onCreate;
	export let currentCard = {};
	export let selLang;
	export let onClose;

	let newCard = {
		id: 'null',
		title: '',
		description: '',
		img: { name: '', url: '' },
		activity: null,
		topics: [],
		loc: { longitude: 4.39, latitude: 50.82 },
		links: [],
		...currentCard
	};

	$: titleKey = titleLocales[selLang];
	let titleExpanded = false;

	const maxCardWidth = 450;
	const maxCardHeight = 700;
</script>

<div
	style="max-width:{maxCardWidth}px;max-height:{maxCardHeight}px"
	class="drop-shadow-xl w-full h-full m-auto"
>
	<div
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
					{currentCard[titleKey] || 'NEW CARD'}
				</h1>
			</div>
			<button on:click={onClose} class="ml-auto">
				<WindowClose size="1.5em" />
			</button>
		</div>
		<EditCardFront
			{...$$props}
			currentCard={newCard}
			{selectedEnvId}
			onChange={(c) => {
				console.log('test');
				newCard = c;
			}}
			onCreate={() => {
				newCard = {
					...newCard,
					id: uuidv4(),
					loc: { longitude: 4.39, latitude: 50.82 }
				};
				onCreate(newCard);
			}}
		/>
	</div>
</div>
