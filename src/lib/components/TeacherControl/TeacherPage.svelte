<script>
	import DeleteIcon from 'svelte-material-icons/Delete.svelte';
	import { store } from '/src/stores/index';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
	import UsersLightBox from './UsersLightBox.svelte';
	import Spinner from '../utils/Spinner.svelte';

	// export let envId;
	/**
	 * @type {(arg0: { groups: any; }) => void}
	 */
	export let onUserChange;

	let counter = 1;

	let selGroupId = null;

	let users;
	let groups;

	getDocs(collection(db, 'users')).then((snap) => {
		users = snap.docs.map((doc) => doc.data()).filter((d) => !!d.uid);
	});

	getDoc(doc(db, 'users', $store.currentUser.uid)).then((snap) => {
		groups = snap.data().groups || [];
	});
</script>

<div class="flex flex-col flex-grow p-3 sm:p-12">
	{#if groups !== undefined}
		{#if groups.length > 0}
			<div class="mb-auto w-full flex-grow overflow-auto h-96">
				{#each groups as g}
					<div class="mb-3">
						<h2 class="text-lg label">{g.title}</h2>
						<ul class="max-h-32 overflow-auto">
							{#each g.userIds as uid}
								<li class="flex p-1 border-b-2">
									<div>{users.find((u) => u.uid === uid).email}</div>
									<button
										class="ml-auto text-red-500"
										on:click={() => {
											groups = groups.map((d) => {
												if (d.id === g.id) {
													return { ...d, userIds: d.userIds.filter((id) => id !== uid) };
												}
												return d;
											});
											onUserChange({ groups });
										}}>X</button
									>
								</li>
							{/each}
							{#if g.userIds.length === 0}
								<li class="text-gray-500 flex"><div class="m-auto">No Users</div></li>
							{/if}
						</ul>
						<button class="btn w-full mt-3" on:click={() => (selGroupId = g.id)}>Add User</button>
					</div>
				{/each}
			</div>
		{:else}
			<div class=" m-auto placeholder-text">No Groups created</div>
		{/if}

		<button
			class="btn mb-3 create-btn flex-none"
			on:click={() => {
				groups = [...groups, { id: counter, title: `New Group ${counter}`, userIds: [] }];
				counter = counter + 1;

				onUserChange({ groups });
			}}>Add Group</button
		>
	{:else}
		<div class="m-auto">
			<Spinner />
		</div>
	{/if}
</div>

<UsersLightBox
	{users}
	{groups}
	selGroup={groups?.find((d) => d.id === selGroupId)}
	assignedUsers={groups?.map((d) => d.userIds).flat()}
	onGroupUidsChange={(uids) => {
		groups = groups.map((d) => {
			if (d.id === selGroupId) {
				return { ...d, userIds: uids };
			}
			return d;
		});

		onUserChange({ groups });
	}}
	onClose={() => (selGroupId = null)}
/>
