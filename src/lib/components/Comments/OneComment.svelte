<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	/**
	 * @type {string}
	 */
	export let text;
	/**
	 * @type {string}
	 */
	export let uid;
	/**
	 * @type {function}
	 */
	export let onRemove;
	/**
	 * @type {string}
	 */
	export let id;
	let user = null;
	// export

	$: pr = getDoc(doc(db, 'users', uid)).then((doc) => {
		const u = doc.data();
		console.log('u', u);
		user = u;
		// return u;
		// console.log('u');
	});
</script>

<div class="flex">
	<div class=" w-10 h-10 flex">
		{#await pr}
			<div class="m-auto">...</div>
		{:then _}
			<img class="w-full h-full" src={`/avatars/${user.avatar}.svg`} />
		{/await}
	</div>
	{#if user}
		<div class="ml-1">
			<div class=" my-auto">{text}</div>
			<div class="italic text-sm texr-gray-500">{user.email}</div>
		</div>
	{/if}

	<button class="ml-auto" on:click={() => onRemove(id)}><WindowClose /></button>
</div>
