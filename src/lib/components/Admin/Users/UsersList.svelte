<script>
	import { store } from '/src/stores/index';
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

	export let selectedEnv;

	/**
	 * @type {any[]}
	 */
	export let userLogs;

	$: selUid = null;

	let userSearchVal = '';
	$: userSearchRes = Array.isArray(users)
		? users.filter((u) => u.email.toLowerCase().includes(userSearchVal.toLowerCase()))
		: [];

	$: console.log('currentUser', $store.currentUser);
</script>

<div class="flex flex-col flex-none max-h-96 overflow-y-auto">
	{#if users === undefined}
		<div class="my-12 mx-auto">
			<Spinner />
		</div>
	{:else if users === null || users.length === 0}
		<div class="m-12 placeholder-text">No users</div>
	{:else}
		<input class="input-text mb-3" placeholder="Search User" bind:value={userSearchVal} />
		<ul class="overflow-auto flex flex-col" style:min-height="12rem">
			{#if userSearchRes.length === 0}
				<li class="placeholder m-auto">No Users found</li>
			{/if}

			{#each userSearchRes as user (user.uid)}
				<li
					class="flex border-b-2 mb-2 cursor-pointer"
					on:click={() => (selUid = user.uid)}
					on:keydown={() => {}}
				>
					<div class:text-green-700={user.uid === $store.currentUser?.uid}>
						{user.email}{#if $store.currentUser?.uid === user.uid}
							{' '}(YOU)
						{/if}
					</div>
					{#if user.envIds?.includes(selectedEnv?.id)}
						<div class="ml-auto text-green-700">Enrolled</div>
						<!-- {:else}
						<div class="ml-auto text-red-700">Not Enrolled</div> -->
					{/if}

					<div />

					<button class="ml-auto"><MagnifyIcon size={20} /></button>
				</li>
			{/each}
		</ul>
	{/if}
	<UserLightBox
		{...$$props}
		userLogs={userLogs ? userLogs.filter((s) => s.uid === selUid) : []}
		selUser={users?.find((d) => d.uid === selUid)}
		onClose={() => (selUid = null)}
		{onDeleteUser}
		{onChangeUser}
	/>
</div>
