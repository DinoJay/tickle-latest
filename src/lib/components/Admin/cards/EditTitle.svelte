<script>
	import { titleLocales } from './../../../constants/locales.js';
	import Tabs from '$lib/components/Tabs.svelte';
	import TabItem from '$lib/components/TabItem.svelte';

	/**
	 * @type {(arg0: { [x: number]: any; }) => any}
	 */
	export let onChange;
	/**
	 * @type {any}
	 */
	export let onClose;
	/**
	 * @type {any}
	 */
	export let langs;
	/**
	 * @type {string}
	 */
	export let selLang;

	/**
	 * @type {object}
	 */
	export let card;
</script>

<Tabs selectedStartIndex={langs.findIndex((l) => l === selLang)}>
	{#each langs as l}
		<TabItem title={l}>
			<input
				placeholder="Enter your title"
				value={card[titleLocales[l]] || ''}
				class="border-2 p-2 w-full"
				on:input={(e) => onChange({ [titleLocales[l]]: e.target.value })}
			/>
		</TabItem>
	{/each}
</Tabs>
<button class="create-btn mt-auto" on:click={onClose}>Save & Close</button>
