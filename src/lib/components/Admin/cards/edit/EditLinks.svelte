<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let links = [];
	export let onChange;

	let newLink = '';

	let height = 600;
	let width = 400;

	// console.log('link');
	/**
	 * LightBox height width for mobile
	 */
	// onMount(() => {
	// 	if (window.innerWidth < width) width = window.innerWidth;
	// 	if (window.innerHeight < height) height = window.innerHeight;
	// });

	/**
	 * Get all the topics from the card
	 */
	// const getLinks = getDoc(docRef).then(async (snap) => {
	// 	const card = snap.data();
	// 	// Get all the topics from the topics id of the card
	// 	links = card?.links || [];
	// });

	/**
	 * Add the selected topic to the card
	 * @param topic
	 */
	const addLink = () => {
		if (!newLink) return;
		const newLinks = [...links, newLink];
		onChange(newLinks);
		// updateDoc(docRef, {
		// 	links: newLinks
		// });
		// links = newLinks;
		newLink = '';
	};

	/**
	 * Remove the topic from the card
	 * @param topic
	 */
	const removeLink = (link) => {
		let newLinks = links.filter((l) => l !== link);

		// updateDoc(docRef, {
		// 	links: newLinks
		// });
		onChange(newLinks);
	};
	$: valid = newLink !== '';
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	<div class="flex flex-col w-[90%]  mx-auto mt-12">
		<div class="flex items-center mb-2">
			<div class="mr-2">Link</div>
			<input bind:value={newLink} class="border-2 p-1 flex-grow" type="text" />
		</div>
		<button
			disabled={!valid}
			class="w-full p-1 border-2 border-black {!valid ? 'opacity-50' : ''}"
			on:click={addLink}>Add link</button
		>
		<p class="mr-auto font-medium">Selected Topics :</p>
		<div class="h-[200px] w-full overflow-y-auto border border-c-black">
			{#each links as l}
				<div
					on:keydown={() => removeLink(l)}
					on:click={() => removeLink(l)}
					class="h-auto w-full py-1 mb-1 text-center text-ellipsis whitespace-nowrap
						bg-c-gray hover:bg-red-300 cursor-pointer"
				>
					{l}
				</div>
			{/each}
		</div>
	</div>
</div>
