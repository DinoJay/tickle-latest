<script>
	import { store } from '/src/stores/index';
	import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

	// import Spinner from '$lib/components/utils/Spinner.svelte';
	import UserActivities from './UserActivities.svelte';
	import UsersList from './UsersList.svelte';

	import { LOG_ACTIVITY_SUBTYPE } from './logTypes';
	import { db } from '$lib/firebaseConfig/firebase';
	export let cards;
	// export let onDelete;
	// export let userLogs;
	// export let selectedEnvId;

	let userLogs = null;
	let users = undefined;

	$: userLogs = !!cards
		? cards
				.flatMap((d) => d.activitySubmissions)
				.map((d) => ({ ...d, logType: LOG_ACTIVITY_SUBTYPE }))
		: undefined;

	getDocs(collection(db, 'users')).then((snap) => {
		users = snap.docs
			.map((doc) => doc.data())
			.filter((d) => !!d.uid && d.uid !== $store.currentUser.uid);
	});
</script>

<UsersList
	{...$$props}
	{users}
	onDeleteUser={(uid) => (users = users.filter((d) => d.uid !== uid))}
	onChangeUser={(u) => {
		console.log('user u', u.envIds);
		const docRef = doc(db, 'users', u.uid);
		setDoc(docRef, u);
		users = users.map((d) => {
			if (d.uid === u.uid) {
				return u;
			}
			return d;
		});
	}}
/>

<UserActivities
	cls="mb-3"
	{...$$props}
	{userLogs}
	onDelete={(logId) => {
		userLogs = userLogs.filter((d) => d.id !== logId);
	}}
/>
