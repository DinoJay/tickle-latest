<script>
	import Logo from '$lib/components/navigationBar/Logo.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, updateDoc, setDoc } from 'firebase/firestore';
	import UploadFile from '$lib/components/utils/UploadFile.svelte';

	export let env = {
		// id: uuidv4(),
		title: '',
		description: '',
		img: { name: '', url: '' }
	};
	export let onChange;

	$: docRef = doc(db, 'card-envs', env.id);
	$: console.log('db env', env);
	// let collectionRef = collection(db, 'card-envs');
	let imgUrl = null;
	const updateDb = (data) => {
		setDoc(docRef, data)
			.then((docRef) => {
				console.log('Entire Document has been updated successfully');
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>

<!-- <EditWindow bind:currentElement={env} {fields} bind:docRef {collectionRef} /> -->
<form on:submit={(e) => e.preventDefault()}>
	<div class="mb-3">
		<div><label for="title">Title:</label></div>
		<input
			value={env.title}
			on:input={(e) => {
				const newEnv = { ...env, title: e.target.value };
				updateDb(newEnv);
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
				updateDb(newEnv);
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
				updateDb(newEnv);
			}}
		/>
	</div>
</form>

<style>
	input {
		@apply border-2 p-1;
	}
</style>
