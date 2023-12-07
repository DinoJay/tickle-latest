<script>
	import UserActivities from './UserActivities.svelte';
	import Spinner from '$lib/components/utils/Spinner.svelte';
	import { db } from '$lib/firebaseConfig/firebase.js';
	import { deleteDoc, doc } from 'firebase/firestore';
	import { LOG_ACTIVITY_SUBTYPE } from './logTypes.js';
	import OneActivity from './OneActivity.svelte';
	/**
	 * @type {any[]}
	 */
	export let cards;
	export let onDelete;
	export let userLogs;
	export let selectedEnvId;
	export let cls = '';
</script>

<div class="flex flex-none flex-col max-h-96 overflow-y-auto {cls}">
	{#if userLogs === undefined}
		<Spinner cls="mx-auto my-12" />
	{:else if userLogs.length === 0}
		<div class="text-center text-xl m-12">No User Logs</div>
	{:else}
		{#each userLogs as s}
			<div class="mb-1">
				<OneActivity
					{...s}
					card={cards.find((c) => c.id === s.cardId)}
					onDelete={(id) => {
						if (s.logType === LOG_ACTIVITY_SUBTYPE) {
							const docRef = doc(
								db,
								'card-envs',
								selectedEnvId,
								'cards',
								s.cardId,
								'activitySubmissions',
								/*important*/
								s.uid
							);
							deleteDoc(docRef);
						}
						onDelete(id);
					}}
				/>
			</div>
		{/each}
	{/if}
</div>
