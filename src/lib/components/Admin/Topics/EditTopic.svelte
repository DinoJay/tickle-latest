<script>
	import DropDown from '$lib/components/utils/DropDown.svelte';
	import UploadFile from '$lib/components/utils/UploadFile.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import SelectColor from './SelectColor.svelte';
	import { LANGS, titleLocales } from '$lib/constants/locales';
	import Tabs from '$lib/components/Tabs.svelte';

	export let currentTopic = {
		title: null,
		title_en: null,
		title_fr: null,
		title_nl: null,
		description: '',
		id: null,
		img: { name: '', url: '' },
		color: null
	};
	/**
	 * @type {string[]}
	 */
	export let langs;
	/**
	 * @type {(arg0: { title_en: any; title: null; title_fr: null; title_nl: null; description: string; id: null; img: { name: string; url: string; } | { name: string; url: string; }; color: any; }) => void}
	 */
	export let onChange;
	/**
	 * @type {(arg0: null) => void}
	 */
	export let onCreate;
	/**
	 * @type {(arg0: null) => void}
	 */
	export let onRemove;
	/**
	 * @type {string}
	 */
	export let selLang;
	/**
	 * @type {(arg0: string) => any}
	 */
	export let onSelLangChange;

	/**
	 * @type {string }
	 */

	let lang = selLang || LANGS[0];
	$: console.log('lang', lang);
	$: titleKey = titleLocales[lang];
	$: console.log('titleKey', titleKey);

	// const descrLocaleso = { [EN]: 'description_en', [FR]: 'description_fr', [NL]: 'description_nl' };
	$: createDisabled = !currentTopic[titleKey] || !currentTopic.color;
</script>

<div class="flex gap-1 mb-3">
	{#each langs as l}
		<button
			class="flex-grow btn uppercase"
			class:disabled={langs.length === 1}
			class:sel-btn={lang === l || langs.length === 1}
			on:click={() => (lang = l)}>{l}</button
		>
	{/each}
</div>
<form
	class="flex-initial flex flex-grow flex-col overlflow-y-auto"
	on:submit={(e) => e.preventDefault()}
>
	<div class="mb-3">
		<div class="label">
			<label for="title">Title:</label>
		</div>
		<input
			placeholder="Enter your title"
			value={currentTopic[titleKey] || ''}
			class="border-2 p-2 w-full"
			on:input={(e) => {
				onChange({ ...currentTopic, [titleKey]: e.target.value });
			}}
		/>
		<abs />
	</div>
	<div class="mb-3">
		<div class="label">
			<label for="image">Image:</label>
		</div>
		<UploadFile
			url={currentTopic.img?.url}
			onChange={(url, name) => {
				const newTopic = { ...currentTopic, img: { name, url } };
				console.log('new topic', newTopic);
				onChange(newTopic);
			}}
		/>
	</div>
	<div class="mb-3">
		<div class="label">
			<label for="color">Color:</label>
		</div>
		<SelectColor
			color={currentTopic.color}
			onChange={(color) => {
				console.log('new color', color);
				const newTopic = { ...currentTopic, color };
				onChange(newTopic);
			}}
		/>
	</div>

	<div class="mt-auto">
		{#if onCreate}
			<button
				class="create-btn w-full"
				class:disabled={createDisabled}
				aria-disabled={createDisabled}
				on:click={() => {
					if (createDisabled) return;
					onCreate(currentTopic.id);
				}}>Create</button
			>
		{:else}
			<button
				class="del-btn w-full"
				on:click={() => {
					onRemove(currentTopic.id);
				}}>Delete</button
			>
		{/if}
	</div>
</form>

<style>
	input {
		@apply border-2 p-1;
	}
	/* label {
		@apply label;
	} */
</style>
