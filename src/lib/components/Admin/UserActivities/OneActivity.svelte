<script>
	import Card from '$lib/components/Card/Card.svelte';
	import ActivitySubLog from './ActivitySubLog.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { LOG_ACTIVITY_SUBTYPE } from './logTypes';

	export let uid;
	export let id;
	export let card;
	export let logType;
	export let onDelete;

	console.log('props', $$props);
	let user = null;

	$: getDoc(doc(db, 'users', uid)).then((d) => (user = d.data()));
</script>

{#if user}
	{#if logType === LOG_ACTIVITY_SUBTYPE}
		<ActivitySubLog {user} {card} {onDelete} {id} />
	{:else}
		Other user log
	{/if}
{:else}
	<div>...loading</div>
{/if}
