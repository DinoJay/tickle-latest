<script>
	import TopicPage from './../Topics/TopicPage.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import PreviewTopic from './PreviewT.svelte';
	export let selectedEnvId = null;

	// let currentTopic = {
	// 	title: '',
	// 	description: '',
	// 	id: 'null',
	// 	img: { name: '', url: '' },
	// 	color: ''
	// };

	let selectedTopicId = null;
	let topics = [];

	$: console.log('selectedEnvId', selectedEnvId);
	$: topicPromise = getDocs(collection(db, 'card-envs', selectedEnvId, 'topics')).then((snap) => {
		const ts = snap.docs.map((doc) => doc.data());
		topics = ts;
	});

	$: selectedTopic = topics.find((d) => d.id === selectedTopicId);
</script>

<div class="flex flex-col flex-grow">
	{#await topicPromise}
		<div>Loading...</div>
	{:then _}
		<TopicPage
			{topics}
			{selectedEnvId}
			{selectedTopic}
			onChange={(ts) => (topics = ts)}
			onClick={(id) => (selectedTopicId = id)}
		/>
	{/await}
</div>
