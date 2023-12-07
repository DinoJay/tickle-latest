<script>
	import DeleteIcon from 'svelte-material-icons/Delete.svelte';
	import { store } from '/src/stores/index';

	import { v4 as uuidv4 } from 'uuid';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
	import UsersLightBox from './UsersLightBox.svelte';
	import Spinner from '../utils/Spinner.svelte';
	import { togglePopUp } from '../../../stores/popUpStore';

	// export let envId;
	/**
	 * @type {(arg0: { groups: any; }) => void}
	 */
	export let onChange;
	export let envId;

	let counter = 0;

	let selGroupId = null;

	let users;
	let groups;

	getDocs(collection(db, 'users')).then((snap) => {
		users = snap.docs.map((doc) => doc.data()).filter((d) => !!d.uid);
	});

	getDoc(doc(db, 'card-envs', envId)).then((snap) => {
		groups = snap.data()?.groups || [];
	});

	const deleteGroup = (id) => {
		togglePopUp({
			title: 'Delete Group',
			text: 'Are you sure to delete the selected group?',
			onConfirm: () => {
				groups = groups.filter((d) => d.id !== id);
				onChange({ groups });
			}
		});
	};

	const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
</script>

<div class="flex flex-col flex-grow p-3 sm:p-12">
	{#if groups !== undefined}
		{#if groups.length > 0}
			<div class="mb-auto w-full flex-grow overflow-auto h-96">
				{#each groups as g}
					<div class="mb-3">
						<h2 class="text-lg label flex">
							<span>{g.title}</span><span
								class="text-red-500 ml-auto cursor-pointer font-bold"
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										deleteGroup(g.id);
									}
								}}
								on:click={() => deleteGroup(g.id)}>X</span
							>
						</h2>
						<ul class="max-h-32 overflow-auto">
							{#each g.userIds as uid}
								<li class="flex p-1 border-b-2">
									<div>{users.find((u) => u.uid === uid).email}</div>
									<button
										class="ml-auto text-red-500 cursor-pointer"
										on:click={() => {
											togglePopUp({
												title: 'Delete User',
												text: 'Are you sure to delete the selected user?',
												onConfirm: () => {
													groups = groups.map((d) => {
														if (d.id === g.id) {
															return { ...d, userIds: d.userIds.filter((id) => id !== uid) };
														}
														return d;
													});
													onChange({ groups });
												}
											});
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
				groups = [
					...groups,
					{ id: uuidv4(), title: `Group ${abc[groups.length % abc.length]}`, userIds: [] }
				];
				counter = counter + 1;

				onChange({ groups });
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

		onChange({ groups });
	}}
	onClose={() => (selGroupId = null)}
/>
