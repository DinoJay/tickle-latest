<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	export let selectedEnvId;

	$: promise = getDocs(collection(db, 'card-envs')).then((sn) => {
		// console.log(
		// 	'sn doc',
		// 	sn.docs.map((doc) => doc.data())
		// );
		return sn.docs.map((doc) => doc.data());
	});

	const slClass = 'border-0 cursor-pointer p-2 drop-shadow-md bg-gray-400  duration-300';
</script>

<div class="flex flex-col">
	{#await promise}
		<label class="mb-2" for="envs">Choose an Environment:</label>
		<select name="envs" id="envs" class={slClass}>
			<option value="volvo">Loading...</option>
		</select>
	{:then envs}
		<label class="mb-2" for="envs">Select an environment to see your collected cards:</label>
		<select
			name="envs"
			id="envs"
			class={slClass}
			on:change={(e) => goto(`/diary/${e.target.value}`)}
		>
			<option value="" selected disabled hidden>Choose an here</option>
			{#each envs as e}
				<option value={e.id} selected={e.id === selectedEnvId}>{e.title}</option>
			{/each}
		</select>
	{/await}
</div>

<style>
	select {
		border-right: 8px solid transparent;
	}
</style>
