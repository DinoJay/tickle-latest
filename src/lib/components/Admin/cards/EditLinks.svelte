<script>
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	export let links = [];
	export let onChange;
	export let onClose;
	let ref = null;
	let name = null;

	const addLink = () => {
		if (!ref) return;
		const nl = { name, ref: `https://${ref}` };
		const newLinks = [...links, nl];
		onChange(newLinks);
		// updateDoc(docRef, {
		// 	links: newLinks
		// });
		// links = newLinks;
		ref = '';
		name = null;
	};
	/**
	 * Remove the topic from the card
	 * @param topic
	 */
	const removeLink = (name) => {
		let newLinks = links.filter((l) => l.name !== name);
		onChange(newLinks);
	};
	$: valid = !!ref && !!name;
</script>

<div class=" mb-2">
	<div class="mr-2 label">Link:</div>
	<div class="flex items-center border-2 p-1">
		<div class="text-gray-500">https://</div>
		<input
			bind:value={ref}
			placeholder="Type new link content"
			class=" ml-1 form-text w-full"
			type="text"
		/>
	</div>
</div>
<div class=" mb-3">
	<div class="mr-2 label">Name:</div>
	<input
		placeholder="Enter link name"
		bind:value={name}
		class="border-2 p-1 form-text w-full"
		type="text"
	/>
</div>
<button
	disabled={!valid}
	class="w-full p-2 border-2 mb-3 {!valid ? 'opacity-50' : ''}"
	on:click={addLink}>Add Link</button
>
<p class="mr-auto label">Added Links:</p>
<div class="flex-grow w-full flex flex-col overflow-y-auto border p-2 h-48">
	{#if links.length === 0}
		<div class="text-gray-500 uppercase m-auto">No Links added</div>
	{/if}
	{#each links as l}
		<div class="px-1 bg-gray-100 flex items-center w-full mb-1">
			<div class="h-auto flex w-full">
				<div class="crop">
					{#if !!l.name && !!l.ref}
						{l.name} ({l.ref})
					{/if}
					{#if !l.name && !l.ref}
						undefined
					{/if}
				</div>
				<button
					class="ml-auto"
					on:keydown={() => removeLink(l.name)}
					on:click={() => removeLink(l.name)}><WindowClose color="red" /></button
				>
			</div>
		</div>
	{/each}
</div>
