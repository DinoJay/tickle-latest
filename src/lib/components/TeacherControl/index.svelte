<script>
	import { doc, updateDoc } from 'firebase/firestore';
	import TeacherPage from './TeacherPage.svelte';
	import { db } from '$lib/firebaseConfig/firebase';

	import { store } from '/src/stores/index';
</script>

<TeacherPage
	{...$$props}
	onUserChange={() => {
		const docRef = doc(db, 'users', $store.currentUser.uid);
		updateDoc(docRef, { groups });
	}}
/>
