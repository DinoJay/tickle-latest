<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

	export let selectedCardId = {};
	export let selectedEnvId = '';

	let topics = [];
	let selectedTopicIds = [];

	let height = 600;
	let width = 400;

	$: docRef = doc(db, 'card-envs', selectedEnvId, 'cards', selectedCardId);
	$: getDoc(docRef).then((snap) => {
		getDocs(collection(db, 'card-envs', selectedEnvId, 'topics')).then((snap) => {
			topics = snap.docs.map((doc) => doc.data());
			selectedTopicIds = snap.data()?.topics;
		});
	});

	const addTopic = (topic) => {
		let exists = selectedTopicIds.find((id) => id == topic.id);
		if (exists) return;
		selectedTopicIds = [...selectedTopicIds, topic.id];

		updateDoc(docRef, {
			topics: selectedTopicIds
		});
	};

	const removeTopic = (topic) => {
		selectedTopics.splice(selectedTopics.indexOf(topic), 1);
		selectedTopics = [...selectedTopics];
		let topicsId = selectedTopics.map((topic) => topic.id);

		updateDoc(docRef, {
			topics: topicsId
		});
	};
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	<div class="flex flex-col w-[90%] m-auto">
		<p class="mr-auto font-medium">Topics :</p>
		<div class="h-[200px] w-full overflow-y-auto border border-c-black">
			{#each topics as topic}
				{#if topic?.title}
					<div
						class="h-auto w-full py-1 mb-1 text-center text-ellipsis whitespace-nowrap
						bg-c-gray hover:bg-c-light-green cursor-pointer"
						on:click={() => addTopic(topic)}
					>
						{topic.title}
					</div>
				{/if}
			{/each}
		</div>
		<p class="mr-auto font-medium">Selected Topics :</p>
		<div class="h-[200px] w-full overflow-y-auto border border-c-black">
			{#each selectedTopics as sTopic}
				<div
					class="h-auto w-full py-1 mb-1 text-center text-ellipsis whitespace-nowrap
						bg-c-gray hover:bg-red-300 cursor-pointer"
					on:click={() => removeTopic(sTopic)}
				>
					{sTopic.title}
				</div>
			{/each}
		</div>
	</div>
</div>
