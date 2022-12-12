<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import FieldThumb from './FieldThumb.svelte';
	/**
	 * @type {string}
	 */
	export let selectedEnvId;
	export let topicIds;
	export let onClick;

	export let allTopics;

	$: topics = allTopics ? topicIds.map((id) => allTopics.find((at) => id === at.id)) : [];
</script>

{#if allTopics && topics}
	<FieldThumb {onClick} type="array" name="Topics" value={topics.map((d) => d.title)} />
{:else}
	<FieldThumb {onClick} type="string" name="Topics" value="loading..." />
{/if}
