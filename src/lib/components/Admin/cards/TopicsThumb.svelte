<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDocs } from 'firebase/firestore';
	import FieldThumb from './FieldThumb.svelte';
	import { titleLocales } from '$lib/constants/locales';
	/**
	 * @type {string[]}
	 */
	export let topicIds;
	/**
	 * @type {any}
	 */
	export let onClick;

	/**
	 * @type {any[]}
	 */
	export let allTopics;

	export let selLang;

	$: topics =
		!!allTopics && !!topicIds ? topicIds.map((id) => allTopics.find((at) => id === at.id)) : [];

	$: console.log('alltopics', { allTopics }, { topicIds });
	$: console.log('topics', topics);
</script>

{#if allTopics && topics}
	<FieldThumb
		{onClick}
		type="array"
		name="Topics"
		value={topics.filter(Boolean).map((d) => d[titleLocales[selLang]])}
	/>
{:else}
	<FieldThumb {onClick} type="string" name="Topics" value="loading..." />
{/if}
