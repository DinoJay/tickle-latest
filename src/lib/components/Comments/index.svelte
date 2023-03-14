<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import CommentsPage from './CommentsPage.svelte';
	import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
	import { v4 as uuidv4 } from 'uuid';

	/**
	 * @type {string}
	 */
	export let selectedEnvId;
	/**
	 * @type {string}
	 */
	export let cardId;

	export let uid;

	export let edit = false;

	/**
	 * @type {any[]}
	 */
	let comments = [];

	$: commentsPromise = getDocs(
		collection(db, 'card-envs', selectedEnvId, 'cards', cardId, 'comments')
	).then((snap) => {
		comments = snap.docs.map((doc) => doc.data());
	});
</script>

{#await commentsPromise}
	<div>Loading...</div>
{:then _}
	<CommentsPage
		{edit}
		{comments}
		onRemove={(id) => {
			comments = comments.filter((c) => c.id !== id);

			const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', cardId, 'comments', id);
			deleteDoc(docRef);
		}}
		onChange={(c) => {
			const id = uuidv4();
			const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', cardId, 'comments', id);
			const nc = { ...c, uid, id, date: new Date() };

			setDoc(docRef, nc);
			comments = [...comments, nc];
		}}
	/>
{/await}
