<script>
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Modal from '$lib/components/utils/Modal.svelte';
	import Spinner from '$lib/components/utils/Spinner.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

	import MagnifyIcon from 'svelte-material-icons/Magnify.svelte';
	import UserLightBox from './UserLightBox.svelte';

	/**
	 * @type {any[] | null | undefined}
	 */
	export let users;
	/**
	 * @type {()=>void}
	 */
	export let onDeleteUser;
	/**
	 * @type {()=>void}
	 */
	export let onChangeUser;

	$: selUid = null;
</script>

<h2 class="text-lg label">Users</h2>
<div class="flex flex-col flex-none max-h-96 overflow-y-auto">
	{#if users === undefined}
		<div class="my-12 mx-auto">
			<Spinner />
		</div>
	{:else if users === null}
		<div class="m-12 placeholder-text">No users</div>
	{:else if users.length === 0}
		<div class="m-12 placeholder-text">No users</div>
	{:else}
		<ul>
			{#each users as user (user.uid)}
				<li
					class="flex border-b-2 mb-2 cursor-pointer"
					on:click={() => (selUid = user.uid)}
					on:keydown={() => {}}
				>
					<div>{user.email}</div>
					<button class="ml-auto"><MagnifyIcon size={20} /></button>
				</li>
			{/each}
		</ul>
	{/if}
	<UserLightBox
		{...$$props}
		selUser={users?.find((d) => d.uid === selUid)}
		onClose={() => (selUid = null)}
		{onDeleteUser}
		{onChangeUser}
	/>
</div>
