<script>
	import { assign } from 'svelte/internal';
	import LightBox from '../utils/LightBox.svelte';

	export let users;
	export let selGroup;
	export let groups;
	export let onClose;
	export let assignedUsers = [];
	export let onGroupUidsChange;

	/**
	 * @type {string | any[]}
	 */
	let uids = [];

	const modifyUsers = (u) =>
		(uids = uids.includes(u.uid) ? uids.filter((id) => id !== u.uid) : [u.uid, ...uids]);

	$: restUsers = (users || []).filter((u) => !assignedUsers.includes(u.uid));

	$: console.log('uids', uids);
</script>

<LightBox isOpen={!!selGroup?.id} title={selGroup?.title} close={onClose}>
	<ul class="flex-grow overflow-auto mb-auto">
		{#each restUsers as u}
			<li
				class="flex cursor-pointer mb-1 border-b-2 p-1"
				class:bg-gray-700={uids.includes(u.uid)}
				class:text-white={uids.includes(u.uid)}
				on:click={() => modifyUsers(u)}
				on:keydown={() => modifyUsers(u)}
			>
				<div>{u.email}</div>
			</li>
		{/each}
	</ul>
	<button
		class="btn mt-3"
		class:disabled={uids.length === 0}
		aria-disabled={uids.length === 0}
		on:click={() => {
			onGroupUidsChange(uids);
			onClose();
		}}
		>Add {uids.length} User{#if uids.length > 1}(s){/if}</button
	>
</LightBox>
