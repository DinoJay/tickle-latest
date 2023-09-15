<script>
	import Plus from 'svelte-material-icons/Plus.svelte';
	import Minus from 'svelte-material-icons/Minus.svelte';
	import Spinner from '$lib/components/utils/Spinner.svelte';
	export let videos = [];
	/**
	 * @type {(arg0: any[]) => void}
	 */
	export let onChange;
	export let onClose;
	let q = '';

	$: console.log('videos', videos);

	$: videoIds = videos.map((d) => d.id);

	$: console.log('videoIds', videoIds);
</script>

<input class="input-text mb-3" placeholder="Search Youtube" bind:value={q} type="text" />
<ul class="overflow-y-auto flex-none" style="max-height:12rem">
	{#each videos as v}
		<li class="relative mb-3 flex items-center">
			<div class="mr-auto">{v.title}</div>
			<button
				class=" m-2"
				on:click={() => {
					onChange(videos.filter((v0) => v0.id !== v.id));
				}}
			>
				<Minus size={30} />
			</button>
		</li>
	{/each}
</ul>
<ul class="flex-grow flex flex-col overflow-y-auto">
	{#await fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_YOUTUBE_API_KEY}&?q=${q}&part=snippet&type=video`)
		.then((res) => res.json())
		.then((data) => {
			console.log('data', data);
			return data;
		})}
		<li class="m-auto">
			<Spinner />
		</li>
	{:then data}
		{#each data.items as video}
			<li class="relative mb-3">
				<iframe
					title={video.snippet.title}
					width="100%"
					height="315"
					src={`https://www.youtube.com/embed/${video.id.videoId}`}
				/>
				<button
					class="absolute bottom-0 right-0 z-10 bg-white"
					on:click={() => {
						if (videoIds.includes(video.id.videoId)) {
							onChange(videos.filter((v) => v.id !== video.id.videoId));
						} else {
							onChange([
								...videos,
								{
									id: video.id.videoId,
									title: video.snippet.title,
									thumbnail: video.snippet.thumbnails.default.url
								}
							]);
						}
					}}
				>
					{#if !videoIds.includes(video.id.videoId)}
						<Plus size={45} />
					{:else}
						<Minus size={45} />
					{/if}
				</button>
			</li>
		{/each}
	{/await}
</ul>

<button class="create-btn mt-3" on:click={onClose}>Save & Close</button>
