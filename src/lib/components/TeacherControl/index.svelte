<script>
	import { store } from '/src/stores/index';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import UsersLightBox from './UsersLightBox.svelte';

	export let envId;

	let counter = 1;

	let selGroupId = null;

	let users;
	getDocs(collection(db, 'users')).then((snap) => {
		users = snap.docs.map((doc) => doc.data()).filter((d) => !!d.uid);
	});

	let groups = $store.currentUser.groups || [];
</script>

<div class="flex flex-col flex-grow p-3 sm:p-12">
	{#if groups.length > 0}
		<div class="mb-auto w-full">
			{#each groups as g}
				<div class="mb-3">
					<h2 class="text-lg label">{g.title}</h2>
					<ul>
						{#each g.userIds as uid}
							<li>{users.find((u) => u.uid === uid).email}</li>
						{/each}
					</ul>
					<button class="btn mx-12 w-full" on:click={() => (selGroupId = g.id)}>Add User</button>
				</div>
			{/each}
		</div>
	{/if}

	{#if groups.length === 0}
		<div class=" m-auto placeholder-text">No Groups created</div>
	{/if}

	<button
		class="btn mb-3 mx-20"
		on:click={() => {
			groups = [...groups, { id: counter, title: `New Group ${counter}`, userIds: [] }];
			counter = counter + 1;
		}}>Add Group</button
	>
</div>

<UsersLightBox
	{users}
	{groups}
	selGroup={groups.find((d) => d.id === selGroupId)}
	assignedUsers={groups.map((d) => d.userIds).flat()}
	onGroupUidsChange={(uids) => {
		groups = groups.map((d) => {
			if (d.id === selGroupId) {
				return { ...d, userIds: uids };
			}
			return d;
		});
	}}
	onClose={() => (selGroupId = null)}
/>
