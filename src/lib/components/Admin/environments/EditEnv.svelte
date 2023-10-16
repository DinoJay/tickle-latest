<script>
	import CompassOutline from 'svelte-material-icons/CompassOutline.svelte';
	import Poll from 'svelte-material-icons/Poll.svelte';
	import Dots from 'svelte-material-icons/DotsHexagon.svelte';
	import UploadFile from '$lib/components/utils/UploadFile.svelte';
	import { EN, FR, NL, descriptionLocales, titleLocales } from '$lib/constants/locales';
	import ResponsiveTabs from '$lib/components/ResponsiveTabs.svelte';
	import TabItem from '$lib/components/ResponsiveTabs.svelte';
	import { VISTYPES, GEOMAP, UPSET, TOPICMAP } from '$lib/constants/visTypes';

	export let env = {
		id: null,
		title: '',
		title_en: null,
		title_fr: null,
		title_nl: null,
		description: null,
		img: { name: null, url: null },
		/**
		 * @type {string[]}
		 */
		langs: [],
		userViews: []
	};
	/**
	 * @type {(arg0: { title: any; id: null; description: any; img: { name: string; url: string; } | { name: string; url: string; }; langs: Array<string>; }) => void}
	 */
	export let onChange;
	/**
	 * @type {(arg0: any) => any | undefined}
	 */
	export let onRemove;
	/**
	 * @type {(arg0: any) => any}
	 */
	export let onCreate;

	/**
	 * @type {(arg0: any) => any}
	 */
	export let onClose;

	// /**
	//  * @type {string}
	//  */
	// export let selLang

	$: langs = env.langs || [EN];
	$: userViews = env.userViews || VISTYPES;
</script>

<div class="flex-1 h-12 flex flex-col overflow-y-auto">
	<div class="mb-3">
		<div><label class="form-text" for="description">Lanuages:</label></div>
		<div class="flex gap-1">
			{#each [EN, FR, NL] as l}
				<button
					class="small-btn flex-grow uppercase"
					class:sel-btn={langs?.includes(l)}
					on:click={() => {
						let newLangs;
						if (langs.includes(l)) {
							if (langs.length === 1) {
								return;
							}
							newLangs = langs.filter((lang) => lang !== l);
						} else {
							newLangs = [...langs, l];
						}
						const newEnv = { ...env, langs: newLangs };
						onChange(newEnv);
					}}>{l}</button
				>
			{/each}
		</div>
	</div>
	<div class="mb-3">
		<div><label class="form-text" for="description">User Views:</label></div>
		<div class="flex gap-1">
			{#each VISTYPES as v}
				<button
					class="small-btn flex-grow uppercase flex items-center"
					class:sel-btn={userViews?.includes(v)}
					on:click={() => {
						let newViews;
						if (userViews.includes(v)) {
							if (userViews.length === 1) {
								return;
							}
							newViews = userViews.filter((view) => view !== v);
						} else {
							newViews = [...userViews, v];
						}
						const newEnv = { ...env, userViews: newViews };
						onChange(newEnv);
					}}
				>
					<span>{v}</span>

					{#if v === GEOMAP}
						<span class="m-auto spinner"> <CompassOutline size={32} /></span>
					{/if}
					{#if v === TOPICMAP}
						<span class="m-auto"> <Dots size={32} /></span>
					{/if}
					{#if v === UPSET}
						<span class="m-auto"> <Poll size={32} /></span>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	{#each langs as l}
		<div class="mb-3">
			<div><label class="form-text" for="title">Title {l.toUpperCase()}:</label></div>
			<input
				value={env[titleLocales[l]] || ''}
				on:input={(e) => {
					const newEnv = { ...env, [titleLocales[l]]: e.target.value };
					onChange(newEnv);
				}}
				class="w-full"
				name="title"
				placeholder="Enter Title"
			/>
		</div>
	{/each}

	{#each langs as l}
		<div class="w-full">
			<div>
				<label class="form-text" for="description">Description {l.toUpperCase()}:</label>
			</div>
			<textarea
				value={env[descriptionLocales[l]] || ''}
				on:input={(e) => {
					const newEnv = { ...env, [descriptionLocales[l]]: e.target.value };
					onChange(newEnv);
				}}
				class="border w-full"
				name="description"
				placeholder="Enter description"
			/>
		</div>
	{/each}
	<div class="mb-3">
		<div><label class="form-text" for="description">Image:</label></div>
		<UploadFile
			url={env.img?.url}
			onChange={(url, name) => {
				const newEnv = { ...env, img: { name, url } };
				onChange(newEnv);
			}}
		/>
	</div>
</div>
<div class="mt-auto">
	{#if onRemove}
		<button class="del-btn w-full" on:click={() => onRemove(env.id)}>Delete Environment</button>
	{/if}
	{#if onCreate !== undefined}
		<button class="create-btn w-full" on:click={onCreate}>Create Environment</button>
	{/if}
	{#if onRemove === undefined && onCreate === undefined}
		<button class="btn w-full" on:click={onClose}>Close</button>
	{/if}
</div>

<style>
	input {
		@apply border-2 p-1;
	}
</style>
