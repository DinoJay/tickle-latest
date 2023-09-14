<script>
	import VideoIcon from 'svelte-material-icons/MovieOutline.svelte';

	import LightBox from '$lib/components/utils/LightBox.svelte';
	import { afterUpdate } from 'svelte';

	/**
	 * @type {any[]}
	 */
	export let videos;
	export let cls = '';

	let openModal = false;
	let selectedId = null;

	const elems = videos.map(() => null);

	// afterUpdate(() => {
	// 	setTimeout(() => {
	// 		const i = videos.findIndex((videos) => videos.id === selectedId);

	// 		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
	// 	}, 100);
	// });
</script>

<button class={cls} on:click={() => (openModal = true)}>
	{#each videos as l}
		<button class="px-1 flex items-center">
			<div class="mr-1">
				<VideoIcon />
			</div>
			<div class="crop text-sm">{l.title}</div>
		</button>
	{/each}
</button>

<LightBox isOpen={openModal} close={() => (openModal = false)} title="Videos">
	<div class="flex-grow overflow-auto">
		{#each videos as l}
			<div class="mb-3">
				<iframe width="100%" height="515" src={`https://www.youtube.com/embed/${l.id}`} />
			</div>
		{/each}
	</div>
</LightBox>
