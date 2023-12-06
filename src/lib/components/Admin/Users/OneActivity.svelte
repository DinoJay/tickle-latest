<script>
	import Card from '$lib/components/Card/CardLightBox.svelte';
	import ActivitySubLog from './ActivitySubLog.svelte';

	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { LOG_ACTIVITY_SUBTYPE } from './logTypes';

	export let uid;
	export let id;
	export let card;
	export let logType;
	export let onDelete;

	let user = null;

	$: getDoc(doc(db, 'users', uid)).then((d) => (user = d.data()));
</script>

<div class="border-b-2">
	{#if user}
		{#if logType === LOG_ACTIVITY_SUBTYPE}
			<ActivitySubLog {user} {card} {onDelete} {id} />
		{:else}
			Other user log
		{/if}
	{:else}
		<div>...loading</div>
	{/if}
</div>
