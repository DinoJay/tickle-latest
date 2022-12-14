<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, updateDoc, setDoc } from 'firebase/firestore';
	import UploadFile from '$lib/components/utils/UploadFile.svelte';

	export let env = {
		id: null,
		title: '',
		description: '',
		img: { name: '', url: '' }
	};
	export let onChange;
	export let onRemove;
	export let onCreate;
</script>

<form class="flex-grow flex flex-col" on:submit={(e) => e.preventDefault()}>
	<div class="mb-3">
		<div><label for="title">Title:</label></div>
		<input
			value={env.title}
			on:input={(e) => {
				const newEnv = { ...env, title: e.target.value };
				onChange(newEnv);
			}}
			class="w-full"
			name="title"
			placeholder="title"
		/>
	</div>
	<div>
		<div><label for="description">Description:</label></div>
		<textarea
			value={env.description}
			on:input={(e) => {
				const newEnv = { ...env, description: e.target.value };
				onChange(newEnv);
			}}
			class="border w-full"
			name="description"
			placeholder="description"
		/>
	</div>
	<div>
		<p>Image</p>
		<UploadFile
			url={env.img?.url}
			onChange={(url, name) => {
				const newEnv = { ...env, img: { name, url } };
				onChange(newEnv);
			}}
		/>
	</div>
	<div class="mt-auto">
		{#if onRemove}
			<button class="del-btn w-full" on:click={() => onRemove(env.id)}>Delete Environment</button>
		{/if}
		{#if onCreate}
			<button class="create-btn w-full" on:click={onCreate}>Create Environment</button>
		{/if}
	</div>
</form>

<style>
	input {
		@apply border-2 p-1;
	}
</style>
