<script>
	import TopicPage from './../Topics/TopicPage.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import PreviewTopic from './PreviewT.svelte';
	export let selectedEnvId = null;
	export let topics;
	export let onChange;

	// let currentTopic = {
	// 	title: '',
	// 	description: '',
	// 	id: 'null',
	// 	img: { name: '', url: '' },
	// 	color: ''
	// };

	let selectedTopicId = null;

	$: selectedTopic = topics?.find((d) => d.id === selectedTopicId);
</script>

<div class="flex flex-col flex-grow">
	<TopicPage
		{topics}
		{selectedEnvId}
		{selectedTopic}
		{onChange}
		onClick={(id) => (selectedTopicId = id)}
	/>
</div>
