<script>
	import TabItem from '$lib/components/TabItem.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import { descriptionLocales } from '$lib/constants/locales';
	import { select } from 'd3';

	/**
	 * @type {any}
	 */
	export let description;

	/**
	 * @type {(arg0: any) => any}
	 */
	export let onChange;
	/**
	 * @type {any}
	 */
	export let onClose;
</script>

<textarea
	style="height:22rem"
	placeholder="Enter your description"
	value={description || ''}
	class="border-2 p-2 w-full"
	on:input={(e) => onChange(e.target.value)}
/>
