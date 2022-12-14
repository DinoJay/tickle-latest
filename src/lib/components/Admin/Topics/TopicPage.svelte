<script>
	import PreviewTopic from '$lib/components/PreviewCard.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import EditTopic from './EditTopic.svelte';
	import CreateTopic from './CreateTopic.svelte';
	import { deleteDoc, doc, setDoc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig/firebase';
	/**
	 * @type {any[]}
	 */
	export let topics;
	/**
	 * @type {(arg0: any) => void}
	 */
	export let onClick;

	/**
	 * @type {{ title: any; id: any; }}
	 */
	export let selectedTopic;
	/**
	 * @type {(arg0: any) => void}
	 */
	export let onChange;
	/**
	 * @type {any}
	 */
	export let selectedEnvId;
	let lbOpen = false;
	let clbOpen = false;
</script>

<div class="flex flex-wrap gap-3">
	{#each topics as t}
		<PreviewTopic
			{...t}
			onClick={() => {
				onClick(t.id);
				lbOpen = true;
			}}
		/>
	{/each}
</div>
<button class="create-btn mt-auto mt-3" on:click={() => (clbOpen = true)}>Create Topic</button>

<LightBox
	cls="overflow-y-auto"
	title={selectedTopic?.title}
	isOpen={lbOpen}
	close={() => (lbOpen = false)}
>
	<EditTopic
		{selectedEnvId}
		onChange={(t) => {
			const ts = topics.map((d) => {
				if (d.id === t.id) {
					return t;
				}
				return d;
			});
			const docRef = doc(db, 'card-envs', selectedEnvId, 'topics', t.id);

			setDoc(docRef, t).catch((e) => console.log('err', e));
			onChange(ts);
		}}
		onRemove={(id) => {
			onChange(topics.filter((t) => t.id !== id));
			const docRef = doc(db, 'card-envs', selectedEnvId, 'topics', id);
			deleteDoc(docRef).then((e) => console.log('res', e));
			lbOpen = false;
		}}
		currentTopic={selectedTopic}
	/>
</LightBox>

<LightBox cls="overflow-y-auto" isOpen={clbOpen} close={() => (clbOpen = false)}
	><CreateTopic
		onCreate={(nt) => {
			console.log('onChange', nt);
			const docRef = doc(db, 'card-envs', selectedEnvId, 'topics', nt.id);
			setDoc(docRef, nt).catch((error) => {
				console.log(error);
			});
			onChange([...topics, nt]);
			clbOpen = false;
		}}
		{selectedEnvId}
	/></LightBox
>
