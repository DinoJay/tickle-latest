<script>
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
	import SearchList from './SearchList.svelte';
	import OneActivity from './OneActivity.svelte';

	/**
	 * @type {{ email: any; avatar: any; teacher: any; uid: string; admin: any; } | null}
	 */
	export let selUser;
	/**
	 * @type {(arg0: string) => void}
	 */
	export let onDeleteUser;
	/**
	 * @type {(arg0: { teacher: any; email: any; avatar: any; uid: any; admin: any; }) => void}
	 */
	export let onChangeUser;
	/**
	 * @type {any}
	 */
	export let envs;
	/**
	 * @type {any}
	 */
	export let onClose;
	/**
	 * @type {any[]}
	 */
	export let cards;
	/**
	 * @type {any}
	 */
	export let userLogs;

	let searchListDisabled = false;
</script>

<LightBox isOpen={!!selUser} title={selUser?.email} close={onClose}>
	<div class="flex flex-col overflow-auto">
		<img
			alt="avatar"
			style:height="200px"
			height="100"
			srcset={'/avatars/' + (selUser.avatar || 'nerd') + '.svg, avatars/nerd.svg'}
		/>
		<div class="flex">
			<div class="w-full">
				<div class="flex items-center">
					<div class="mr-auto label">Teacher</div>
					<input
						type="checkbox"
						bind:checked={selUser.teacher}
						on:change={(e) => {
							const checked = e.target.checked;
							onChangeUser({ ...selUser, teacher: checked });
						}}
					/>
				</div>
				<div class="flex items-center">
					<div class="mr-auto label">Admin</div>
					<input
						type="checkbox"
						bind:checked={selUser.admin}
						on:change={(e) => {
							const checked = e.target.checked;
							onChangeUser({ ...selUser, admin: checked });
						}}
					/>
				</div>
			</div>
		</div>
		<h3 class="label mt-3">Select Environments</h3>
		<SearchList
			{envs}
			uid={selUser.uid}
			envIds={selUser.envIds || []}
			disabled={searchListDisabled}
			onEnvIdsChange={(envIds) => {
				onChangeUser({ ...selUser, envIds });
			}}
		/>

		<div class="flex flex-col">
			<h3 class="label mt-3">User logs</h3>
			<ul>
				{#each userLogs as s}
					<li>
						<OneActivity {...s} card={cards.find((c) => c.id === s.cardId)} />
					</li>
				{/each}
			</ul>
			{#if userLogs.length === 0}
				<div class="text-gray-600 mx-auto my-4">No logs found</div>
			{/if}
		</div>
	</div>
	<button
		class="del-btn mt-3"
		on:click={() => {
			onDeleteUser(selUser.uid);

			const docRef = doc(db, 'users', selUser.uid);
			deleteDoc(docRef);
			selUser = null;
		}}
	>
		Delete User
	</button>
</LightBox>
