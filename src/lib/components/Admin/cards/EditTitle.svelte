<script>
	import Tabs from '$lib/components/Tabs.svelte';
	import TabItem from '$lib/components/TabItem.svelte';

	export let value;
	export let onChange;
	export let onClose;
	export let valueEn;
	export let valueFr;
	export let valueNl;

	console.log('value', value);
</script>

<Tabs>
	<TabItem title="en">
		<input
			placeholder="Enter your title"
			value={valueEn || ''}
			class="border-2 p-2 w-full"
			on:input={(e) => onChange({ title_en: e.target.value })}
		/>
	</TabItem>
	<TabItem title="fr">
		<input
			placeholder="Enter your title"
			value={valueFr || ''}
			class="border-2 p-2 w-full"
			on:input={(e) => onChange({ title_fr: e.target.value })}
		/>
	</TabItem>
	<TabItem title="nl">
		<input
			placeholder="Enter your title"
			value={valueNl || ''}
			class="border-2 p-2 w-full"
			on:input={(e) => onChange({ title_nl: e.target.value })}
		/>
	</TabItem>
</Tabs>
<button class="create-btn mt-auto" on:click={onClose}>Save & Close</button>
