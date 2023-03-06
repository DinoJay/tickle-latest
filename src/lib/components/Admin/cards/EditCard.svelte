<script>
	import Activity from './../../Card/Challenge/Activity.svelte';
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

	export let selectedEnvId;
	export let currentCard = {
		id: 'null',
		title: '',
		description: '',
		img: { name: '', url: '' },
		activity: null,
		topics: [],
		loc: { longitude: 4.39, latitude: 50.82 },
		links: []
	};
	export let onChange;
	export let onRemove;
	export let onCreate;

	const TITLE = 'title';
	const TOPICS = 'topics';
	const LINKS = 'links';
	const DESCR = 'descr';
	const ACTIVITY = 'activity';
	let allTopics;

	let selectedField;

	console.log('currentCard', currentCard);

	$: getDocs(collection(db, 'card-envs', selectedEnvId, 'topics')).then((snap) => {
		allTopics = snap.docs.map((doc) => doc.data());
	});
</script>

<div class="mb-3 flex-shrink-0">
	<UploadFile
		url={currentCard.img?.url}
		onChange={(url, name) => {
			onChange({ ...currentCard, img: { url, name } });
		}}
	/>
</div>
<div class="flex flex-wrap gap-2 flex-shrink-1 overflow-y-auto mb-auto">
	<FieldThumb name="Title" value={currentCard.title} onClick={() => (selectedField = TITLE)} />
	<FieldThumb
		type="string"
		name="Description"
		value={currentCard.description}
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
		name="Activity"
		value={currentCard.activity?.type}
		onClick={() => (selectedField = ACTIVITY)}
	/>
</div>
{#if !!onRemove}
	<button class=" del-btn mt-3" on:click={() => onRemove(currentCard)}>Remove Card</button>
{/if}
{#if !!onCreate}
	<button class=" create-btn mt-3" on:click={() => onCreate(currentCard)}>Create Card</button>
{/if}

<LightBox
	isOpen={selectedField === TITLE}
	title={selectedField}
	close={() => (selectedField = null)}
	cls="overflow-y-auto"
>
	<EditTitle value={currentCard.title} onChange={(title) => onChange({ ...currentCard, title })} />
</LightBox>

<LightBox
	isOpen={selectedField === DESCR}
	title={selectedField}
	close={() => (selectedField = null)}
>
	<EditDescr
		value={currentCard.description}
		onChange={(description) => onChange({ ...currentCard, description })}
	/>
</LightBox>

<LightBox
	isOpen={selectedField === LINKS}
	title={selectedField}
	close={() => (selectedField = null)}
	cls="flex-grow"
>
	<EditLinks links={currentCard.links} onChange={(links) => onChange({ ...currentCard, links })} />
</LightBox>

<LightBox
	isOpen={selectedField === TOPICS}
	title={selectedField}
	close={() => (selectedField = null)}
>
	<EditTopics
		topicIds={currentCard.topics}
		{allTopics}
		onChange={(topics) => onChange({ ...currentCard, topics })}
	/>
</LightBox>

<LightBox
	isOpen={selectedField === ACTIVITY}
	title={selectedField}
	close={() => (selectedField = null)}
	cls="flex-grow"
>
	<EditActivity
		activity={currentCard.activity}
		onChange={(activity) => onChange({ ...currentCard, activity })}
		onRemove={() => onChange({ ...currentCard, activity: null })}
	/>
</LightBox>
