<script>
	import { db } from '$lib/firebaseConfig/firebase.js';
	import { deleteDoc, doc } from 'firebase/firestore';
	import { LOG_ACTIVITY_SUBTYPE } from './logTypes.js';
	import OneActivity from './OneActivity.svelte';
	export let cards;
	export let onDelete;
	export let userLogs;
	export let selectedEnvId;
</script>

<div>
	{#if !!!userLogs}
		<div>...Loading</div>
	{:else}
		{#if userLogs.length === 0}
			<div>No User Logs</div>
		{/if}
		{#each userLogs as s}
			<div class="mb-1">
				<OneActivity
					{...s}
					card={cards.find((c) => c.id === s.cardId)}
					onDelete={(id) => {
						if (s.logType === LOG_ACTIVITY_SUBTYPE) {
							console.log('del', s);
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
