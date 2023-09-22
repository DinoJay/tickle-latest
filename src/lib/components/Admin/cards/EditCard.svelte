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

	import TopicsThumb from './TopicsThumb.svelte';
	import EditYoutube from './EditYoutube.svelte';

	/**
	 * @type {string}
	 */
	export let selectedEnvId;
	export let currentCard = {
		id: 'null',
		title: '',
		description: '',
		description_en: '',
		description_fr: '',
		description_nl: '',
		img: { name: '', url: '' },
		activity: null,
		topics: [],
		loc: { longitude: 4.39, latitude: 50.82 },
		links: [],
		videos: []
	};
	/**
	 * @type {(arg0: { img: { name: string; url: string; } | { url: string; name: string; }; id: string; title: any; description: any; activity: any; topics: any; loc: { longitude: number; latitude: number; }; links: any; }) => void}
	 */
	export let onChange;
	/**
	 * @type {(arg0: { id: string; title: string; description: string; img: { name: string; url: string; }; activity: null; topics: never[]; loc: { longitude: number; latitude: number; }; links: never[]; }) => any}
	 */
	export let onRemove;

	/**
	 * @type {((arg0: { id: string; title: string; description: string; img: { name: string; url: string; }; activity: null; topics: never[]; loc: { longitude: number; latitude: number; }; links: never[]; }) => any) | null}
	 */
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
	let selectedField;

	console.log('currentCard', currentCard);

	$: getDocs(collection(db, 'card-envs', selectedEnvId, 'topics')).then((snap) => {
		allTopics = snap.docs.map((doc) => doc.data());
	});
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
<div class="flex flex-wrap gap-2 flex-shrink-1 overflow-y-auto mb-auto">
	<FieldThumb
		type="string"
		name="Title"
		value={currentCard.title}
		onClick={() => (selectedField = TITLE)}
	/>
	<FieldThumb
		type="string"
		name="Description"
		value={currentCard.description || currentCard.description_en || currentCard.description_fr}
		onClick={() => (selectedField = DESCR)}
	/>
	<TopicsThumb {allTopics} topicIds={currentCard.topics} onClick={() => (selectedField = TOPICS)} />
	<FieldThumb
		type="array"
		name="Links"
		value={currentCard.links}
		accessor={(d) => d.name}
		onClick={() => (selectedField = LINKS)}
	/>
	<FieldThumb
		type="array"
		name="Videos"
		value={currentCard.videos}
		accessor={(d) => d.title}
		onClick={() => (selectedField = VIDEOS)}
	/>
	<FieldThumb
		type="array"
		name="Activity"
		value={currentCard.activity?.type}
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
	height={null}
>
	<EditTitle
		onClose={() => (selectedField = null)}
		valueEn={currentCard.title_en || currentCard.title}
		valueFr={currentCard.title_fr}
		valueNl={currentCard.title_nl}
		onChange={(title) => onChange({ ...currentCard, ...title })}
	/>
</LightBox>

<LightBox
	isOpen={selectedField === DESCR}
	title={selectedField || undefined}
	height={null}
	close={() => (selectedField = null)}
>
	<EditDescr
		valueEn={currentCard.description_en || currentCard.description || ''}
		valueFr={currentCard.description_fr || ''}
		valueNl={currentCard.description_nl || ''}
		onClose={() => (selectedField = null)}
		onChange={(description) => onChange({ ...currentCard, ...description })}
	/>
</LightBox>

<LightBox
	isOpen={selectedField === LINKS}
	title={selectedField || undefined}
	close={() => (selectedField = null)}
>
	<EditLinks
		onClose={() => (selectedField = null)}
		links={currentCard.links}
		onChange={(links) => onChange({ ...currentCard, links })}
	/>
</LightBox>

<LightBox
	isOpen={selectedField === TOPICS}
	title={selectedField || undefined}
	close={() => (selectedField = null)}
>
	<EditTopics
		onClose={() => (selectedField = null)}
		topicIds={currentCard.topics}
		{allTopics}
		onChange={(topics) => onChange({ ...currentCard, topics })}
	/>
</LightBox>

<LightBox
	isOpen={selectedField === VIDEOS}
	title={selectedField || undefined}
	close={() => (selectedField = null)}
>
	<EditYoutube
		videos={currentCard.videos}
		onClose={() => (selectedField = null)}
		onChange={(videos) => onChange({ ...currentCard, videos })}
	/>
</LightBox>

<LightBox
	isOpen={selectedField === ACTIVITY}
	title={selectedField}
	close={() => (selectedField = null)}
	cls="flex-grow"
>
	<EditActivity
		onClose={() => (selectedField = null)}
		activity={currentCard.activity}
		onChange={(activity) => {
			console.log('activity', activity);
			onChange({ ...currentCard, activity });
		}}
		onRemove={() => onChange({ ...currentCard, activity: null })}
	/>
</LightBox>
