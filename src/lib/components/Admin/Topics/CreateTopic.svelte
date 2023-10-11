<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, setDoc } from 'firebase/firestore';
	import { v4 as uuidv4 } from 'uuid';

	// import UploadFile from '$lib/components/utils/UploadFile.svelte';
	import EditTopic from './EditTopic.svelte';
	$: id = uuidv4();
	let topic = { id: null, title: '', description: '', img: {} };
	/**
	 * @type {(arg0: { title: string; description: string; img: {}; }) => void}
	 */
	export let onCreate;
	/**
	 * @type {string}
	 */

	let currentTopic = {
		title: null,
		title_en: null,
		title_fr: null,
		title_nl: null,
		description: null,
		description_en: null,
		description_fr: null,
		description_nl: null,
		img: { name: null, url: null },
		color: null
	};
</script>

<EditTopic
	{...$$props}
	{currentTopic}
	onChange={(t) => {
		currentTopic = t;
	}}
	onCreate={() => onCreate({ id: uuidv4(), ...currentTopic })}
/>
