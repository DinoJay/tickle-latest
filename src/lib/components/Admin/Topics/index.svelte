<script>
	import TopicPage from './../Topics/TopicPage.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import PreviewTopic from './PreviewT.svelte';
	export let selectedEnvId = null;

	let currentTopic = {
		title: '',
		description: '',
		id: 'null',
		img: { name: '', url: '' },
		color: ''
	};

	let selectedTopicId = null;
	let topics = [];
	let loading = false;

	loading = true;
	$: topicPromise = getDocs(collection(db, 'card-envs', selectedEnvId, 'topics')).then((snap) => {
		const ts = snap.docs.map((doc) => doc.data());
		topics = ts;
		loading = false;
		// console.log('topics', topics);
	});

	$: selectedTopic = topics.find((d) => d.id === selectedTopicId);
</script>

<div class="flex flex-col flex-grow">
	{#if loading}
		<div>Loading...</div>
	{/if}
	{#if !loading}
		<TopicPage
			{topics}
			{selectedEnvId}
			{selectedTopic}
			onChange={(ts) => (topics = ts)}
			onClick={(id) => (selectedTopicId = id)}
		/>
	{/if}
</div>
