<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, setDoc } from 'firebase/firestore';
	import { v4 as uuidv4 } from 'uuid';

	import UploadFile from '$lib/components/Admin/utils/edit/UploadFile.svelte';
	$: id = uuidv4();
	let env = { id: '', title: '', description: '', img: {} };
	/**
	 * @type {(arg0: { title: string; description: string; img: {}; }) => void}
	 */
	export let onChange;
	/**
	 * @type {string}
	 */

	$: docRef = doc(db, 'card-envs', id);
	const updateDb = (/** @type {{ title: string; description: string; img: {}; }} */ data) => {
		setDoc(docRef, data)
			.then((docRef) => {
				console.log('Entire Document has been updated successfully');
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>

<form class="flex-grow flex flex-col" on:submit={(e) => e.preventDefault()}>
	<div class="mb-3 ">
		<div><label for="title">Title:</label></div>
		<input
			value={env.title}
			on:input={(e) => {
				env = { ...env, id, title: e.target?.value };
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
				env = { ...env, id, description: e.target?.value };
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
				env = { ...env, id, img: { name, url } };
			}}
		/>
	</div>
	<div class="mt-auto ">
		<button
			class="create-btn w-full"
			on:click={() => {
				updateDb(env);
				onChange(env);
			}}>Create</button
		>
	</div>
</form>
