<script>
	import EditLinks from './EditLinks.svelte';
	import EditDescr from './../../Admin/cards/EditDescr.svelte';
	import FieldThumb from './../../Admin/cards/FieldThumb.svelte';
	import UploadFile from '$lib/components/utils/UploadFile.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import EditTitle from './EditTitle.svelte';
	import EditTopics from './EditTopics.svelte';
	import EditActivity from './EditActivity.svelte';
	import {
		activityLocales,
		descriptionLocales,
		linksLocales,
		titleLocales,
		videosLocales
	} from '$lib/constants/locales.js';

	import TopicsThumb from './TopicsThumb.svelte';
	import EditYoutube from './EditYoutube.svelte';

	import Tabs from '$lib/components/ResponsiveTabs.svelte';
	import TabItem from '$lib/components/TabItem.svelte';
	import { onMount } from 'svelte';

	/**
	 * @type {string[]}
	 */
	export let langs;

	/**
	 * @type {string}
	 */
	export let selLang;
	/**
	 * @type {string}
	 */
	export let selectedEnvId;
	export let currentCard = {
		id: null,
		title: '',
		title_en: null,
		title_fr: null,
		title_nl: null,
		description: '',
		description_en: '',
		description_fr: '',
		description_nl: '',
		img: { name: '', url: '' },
		activity_en: null,
		activity_fr: null,
		activity_nl: null,
		topics: [],
		loc: { longitude: 4.39, latitude: 50.82 },
		links: [],
		links_en: [],
		links_fr: [],
		links_nl: [],
		videos: [],
		videos_en: [],
		videos_fr: [],
		videos_nl: []
	};
	/**
	 * @type {(arg0: { img: { name: string; url: string; } | { url: string; name: string; }; id: null; title: string; title_en: null; title_fr: null; title_nl: null; description: string; description_en: string; description_fr: string; description_nl: string; activity_en: null; activity_fr: null; activity_nl: null; topics: any[] | never[]; loc: { longitude: number; latitude: number; }; links: never[]; links_en: never[]; links_fr: never[]; links_nl: never[]; videos: never[]; videos_en: never[]; videos_fr: never[]; videos_nl: never[]; type?: string; value_en?: any; value_fr?: any; value_nl?: any; activity?: null; }) => void}
	 */
	export let onChange;

	export let onRemove;

	export let onCreate = null;

	const TITLE = 'title';
	const TOPICS = 'topics';
	const LINKS = 'links';
	const DESCR = 'description';
	const ACTIVITY = 'activity';
	const VIDEOS = 'videos';
	/**
	 * @type {import("@firebase/firestore").DocumentData[]}
	 */
	let allTopics;

	/**
	 * @type {string | null}
	 */
	let selectedField = null;

	onMount(() => {
		getDocs(collection(db, 'card-envs', selectedEnvId, 'topics')).then((snap) => {
			allTopics = snap.docs.map((doc) => doc.data());
		});
	});

	console.log('currentCard', currentCard);

	$: tabStartIndex = langs.indexOf(selLang);

	$: console.log('currentCard', currentCard);
</script>

<div class="mb-3 flex-shrink-0">
	<UploadFile
		url={currentCard.img?.url}
		label="Upload Image"
		onChange={(url, name) => {
			onChange({ ...currentCard, img: { url, name } });
		}}
	/>
</div>
<div
	class="flex flex-wrap grid-flow-col gap-2 place-items-stretch overflow-y-auto mb-auto items-start"
>
	<FieldThumb
		type="string"
		name="Title"
		value={currentCard[titleLocales[selLang]]}
		onClick={() => (selectedField = TITLE)}
	/>
	<FieldThumb
		type="string"
		name="Description"
		value={currentCard[descriptionLocales[selLang]]}
		onClick={() => (selectedField = DESCR)}
	/>
	<TopicsThumb
		{selLang}
		{allTopics}
		topicIds={currentCard.topics}
		onClick={() => (selectedField = TOPICS)}
	/>
	<FieldThumb
		type="array"
		name="Links"
		value={currentCard[linksLocales[selLang]]}
		accessor={(d) => d.name}
		onClick={() => (selectedField = LINKS)}
	/>
	<FieldThumb
		type="array"
		name="Videos"
		value={currentCard[videosLocales[selLang]]}
		accessor={(d) => d.title}
		onClick={() => (selectedField = VIDEOS)}
	/>
	<FieldThumb
		type="array"
		name="Activity"
		value={currentCard[activityLocales(selLang)]?.type}
		onClick={() => (selectedField = ACTIVITY)}
	/>
</div>
{#if !!onRemove}
	<button class=" del-btn mt-3" on:click={() => onRemove(currentCard)}>Remove Card</button>
{/if}
{#if !!onCreate}
	<button
		disabled={currentCard.topics.length === 0}
		class=" create-btn mt-3 {currentCard.topics.length === 0 ? 'opacity-50' : ''}"
		on:click={() => onCreate(currentCard)}>Create Card</button
	>
{/if}

<LightBox
	isOpen={selectedField === TITLE}
	title={selectedField || undefined}
	close={() => (selectedField = null)}
	fixedWidth={true}
	height={null}
>
	<Tabs selectedStartIndex={tabStartIndex}>
		{#each langs as l (l)}
			<TabItem title={l}>
				<EditTitle
					onClose={() => (selectedField = null)}
					title={currentCard[titleLocales[l]]}
					onChange={(title) => onChange({ ...currentCard, [titleLocales[l]]: title })}
				/>
			</TabItem>
		{/each}
	</Tabs>
	<button class="btn mt-3 w-full mx-auto" on:click={() => (selectedField = null)}>Close</button>
</LightBox>

<LightBox
	isOpen={selectedField === DESCR}
	title={selectedField || undefined}
	height={null}
	close={() => (selectedField = null)}
	fixedWidth={true}
>
	<Tabs selectedStartIndex={tabStartIndex}>
		{#each langs as l (l)}
			<TabItem title={l}>
				<EditDescr
					description={currentCard[descriptionLocales[l]]}
					onClose={() => (selectedField = null)}
					onChange={(description) =>
						onChange({ ...currentCard, [descriptionLocales[l]]: description })}
				/>
			</TabItem>
		{/each}
	</Tabs>
	<button class="btn mt-3 w-full mx-auto" on:click={() => (selectedField = null)}>Close</button>
</LightBox>

<LightBox
	isOpen={selectedField === LINKS}
	title={selectedField || undefined}
	close={() => (selectedField = null)}
	fixedWidth={true}
>
	<Tabs selectedStartIndex={tabStartIndex}>
		{#each langs as l (l)}
			<TabItem title={l}>
				<EditLinks
					onClose={() => (selectedField = null)}
					links={currentCard[linksLocales[l]]}
					onChange={(links) => onChange({ ...currentCard, [linksLocales[l]]: links })}
				/>
			</TabItem>
		{/each}
	</Tabs>

	<button class="btn mt-3 mx-auto w-full" on:click={() => (selectedField = null)}
		>Save & Close</button
	>
</LightBox>

<LightBox
	isOpen={selectedField === TOPICS}
	title={selectedField || undefined}
	close={() => (selectedField = null)}
>
	<EditTopics
		onClose={() => (selectedField = null)}
		topicIds={currentCard.topics}
		{selLang}
		{allTopics}
		onChange={(topics) => onChange({ ...currentCard, topics })}
	/>

	<button class="btn mt-3 w-full mx-auto" on:click={() => (selectedField = null)}>Close</button>
</LightBox>

<LightBox
	isOpen={selectedField === VIDEOS}
	title={selectedField || undefined}
	close={() => (selectedField = null)}
	fullHeight={true}
>
	<Tabs selectedStartIndex={tabStartIndex}>
		{#each langs as l (l)}
			<TabItem title={l}>
				<EditYoutube
					videos={currentCard[videosLocales[l]]}
					onClose={() => (selectedField = null)}
					onChange={(videos) => onChange({ ...currentCard, [videosLocales[l]]: videos })}
				/>
			</TabItem>
		{/each}
	</Tabs>
</LightBox>

<LightBox
	isOpen={selectedField === ACTIVITY}
	title={selectedField || undefined}
	close={() => (selectedField = null)}
>
	<EditActivity
		onClose={() => (selectedField = null)}
		activity_en={currentCard.activity_en}
		activity_fr={currentCard.activity_fr}
		activity_nl={currentCard.activity_nl}
		{langs}
		onChange={(activityObj) => {
			onChange({ ...currentCard, ...activityObj });
		}}
		onRemove={() =>
			//TODO remove single activity
			onChange({ ...currentCard, activity_en: null, activity_fr: null, activity_nl: null })}
	/>
</LightBox>
