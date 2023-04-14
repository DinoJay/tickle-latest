<script>
	import DropDown from '$lib/components/utils/DropDown.svelte';
	import UploadFile from '$lib/components/utils/UploadFile.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
	import { v4 as uuidv4 } from 'uuid';
	import SelectColor from './SelectColor.svelte';

	export let currentTopic = {
		title: '',
		description: '',
		id: null,
		img: { name: '', url: '' },
		color: null
	};
	export let onChange;
	export let onCreate;
	export let onRemove;

	$: console.log('current topic', currentTopic);
</script>

<form class="flex-initial flex flex-col overlflow-y-auto" on:submit={(e) => e.preventDefault()}>
	<div class="mb-3 ">
		<div class="label">
			<label for="title">Title:</label>
		</div>
		<input
			value={currentTopic.title}
			on:input={(e) => {
				const newTopic = { ...currentTopic, title: e.target.value };
				onChange(newTopic);
			}}
			class="w-full"
			name="title"
			placeholder="title"
		/>
	</div>
	<div>
		<div class="label">
			<label for="description">Description:</label>
		</div>
		<textarea
			value={currentTopic.description}
			on:input={(e) => {
				const newTopic = { ...currentTopic, description: e.target.value };
				onChange(newTopic);
			}}
			class="border w-full"
			name="description"
			placeholder="description"
		/>
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
				class="create-btn w-full "
				on:click={() => {
					onCreate(currentTopic.id);
				}}>Create</button
			>
		{:else}
			<button
				class="del-btn w-full "
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
