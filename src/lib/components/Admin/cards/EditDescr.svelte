<script>
	import TabItem from '$lib/components/TabItem.svelte';
	import Tabs from '$lib/components/Tabs.svelte';

	/**
	 * @type {string}
	 */
	export let valueEn;
	/**
	 * @type {string}
	 */
	export let valueFr;
	/**
	 * @type {any}
	 */
	export let valueNl;
	/**
	 * @type {(arg0: any) => any}
	 */
	export let onChange;
	/**
	 * @type {any}
	 */
	export let onClose;
</script>

<Tabs>
	<TabItem title="en">
		<textarea
			style="height:22rem"
			placeholder="Enter your description"
			value={valueEn}
			class="border-2 p-2 w-full"
			on:input={(e) => onChange({ description_en: e.target.value })}
		/>
	</TabItem>
	<TabItem title="fr">
		<textarea
			style="height:22rem"
			placeholder="Enter your description"
			value={valueFr}
			class="border-2 p-2 w-full"
			on:input={(e) => onChange({ description_fr: e.target.value })}
		/>
	</TabItem>
	<TabItem title="nl">
		<textarea
			style="height:22rem"
			placeholder="Enter your description"
			value={valueNl}
			class="border-2 p-2 w-full"
			on:input={(e) => onChange({ description_nl: e.target.value })}
		/>
	</TabItem>
</Tabs>
<button class="create-btn mt-3" on:click={onClose}>Save & Close</button>
