<script>
	import { doc, updateDoc } from 'firebase/firestore';
	import TeacherPage from './TeacherPage.svelte';
	import { db } from '$lib/firebaseConfig/firebase';

	export let envId;
</script>

<TeacherPage
	{...$$props}
	onChange={(obj) => {
		const docRef = doc(db, 'card-envs', envId);
		updateDoc(docRef, obj).catch((error) => {
			console.log(error);
		});
	}}
/>
