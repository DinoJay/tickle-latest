<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import SlideIn from './SlideIn.svelte';

	/**
	 * @type {string}
	 */
	export let selectedEnvId;

	export let linkPrefix = '/diary';

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
		<div class="text-lg">Loading...</div>
	{:then envs}
		{@const selEnvTitle = envs.find((e) => e.id === selectedEnvId)?.title}
		<SlideIn cls="mb-3">
			<div class="text-lg" slot="title">
				{#if !!selEnvTitle}
					{selEnvTitle}
				{:else}
					Select an environment to see your collected cards:
				{/if}
			</div>
			{#each envs as e}
				<li class="text-lg">
					<button
						on:click={() => goto(`${linkPrefix}/${e.id}`)}
						class="border-b-2 mb-1 cursor-pointer w-full text-left">{e.title}</button
					>
				</li>
			{/each}
		</SlideIn>
	{/await}
</div>

<style>
	select {
		border-right: 8px solid transparent;
	}
</style>
