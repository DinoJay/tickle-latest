<script>
	import UploadFile from '$lib/components/utils/UploadFile.svelte';
	import { EN, FR, NL } from '$lib/constants/locales';

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
		langs: []
	};
	/**
	 * @type {(arg0: { title: any; id: null; description: any; img: { name: string; url: string; } | { name: string; url: string; }; langs: Array<string>; }) => void}
	 */
	export let onChange;
	/**
	 * @type {(arg0: null) => any} | null
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
</script>

<div class="flex-1 h-12 flex flex-col overflow-y-auto">
	<div class="mb-3">
		<div><label class="form-text" for="title">Title:</label></div>
		<input
			value={env.title}
			on:input={(e) => {
				const newEnv = { ...env, title: e.target.value };
				onChange(newEnv);
			}}
			class="w-full"
			name="title"
			placeholder="Enter Title"
		/>
	</div>
	<div>
		<div><label class="form-text" for="description">Description:</label></div>
		<textarea
			value={env.description}
			on:input={(e) => {
				const newEnv = { ...env, description: e.target.value };
				onChange(newEnv);
			}}
			class="border w-full"
			name="description"
			placeholder="Enter description"
		/>
	</div>
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
