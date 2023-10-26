<script>
	import DropDown from '$lib/components/utils/DropDown.svelte';
	import UploadFile from '$lib/components/utils/UploadFile.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import SelectColor from './SelectColor.svelte';
	import { LANGS, titleLocales } from '$lib/constants/locales';
	import Tabs from '$lib/components/Tabs.svelte';

	import Check from 'svelte-material-icons/CheckBold.svelte';
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

	let ls = [selLang || LANGS[0]];

	// const descrLocaleso = { [EN]: 'description_en', [FR]: 'description_fr', [NL]: 'description_nl' };
	$: createDisabled =
		langs.map((l) => currentTopic[titleLocales[l]]).find((t) => !t) || !currentTopic.color;

	$: console.log('currentTopic', currentTopic);
</script>

<div class="overflow-y-auto">
	<form
		class="flex-initial flex flex-grow flex-col overlflow-y-auto"
		on:submit={(e) => e.preventDefault()}
	>
		{#each langs as l}
			<div class="mb-3">
				<div class="label">
					<label for="title">Title <span class="uppercase">{l}</span>:</label>
				</div>
				<input
					placeholder="Enter your title"
					value={currentTopic[titleLocales[l]] || ''}
					class="border-2 p-2 w-full"
					on:change={(e) => {
						onChange({ ...currentTopic, [titleLocales[l]]: e.target.value });
					}}
				/>
				<abs />
			</div>
		{/each}
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
</div>

<style>
	input {
		@apply border-2 p-1;
	}
	/* label {
		@apply label;
	} */
</style>
