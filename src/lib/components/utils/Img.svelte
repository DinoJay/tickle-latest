<script>
	import ImageArea from 'svelte-material-icons/imageArea.svelte';

	/**
	 * @type {string}
	 */
	export let url;
	export let title = '';
	export let style = '';
	export let cls = '';
</script>

<div {style} class={`${cls} flex flex-col`}>
	{#if !!url}
		<!-- <img src={url} alt={title} class="w-full object-contain h-full" /> -->
		<div class="flex flex-col flex-grow relative">
			<!-- <div class="absolute left-0 top-0 w-full  h-full flex" style="z-index:-1">
				<div class="m-auto">
					<ImageArea size="200" color="grey" />
				</div>
			</div> -->
			<div
				class="flex-grow w-full bg-contain bg-center bg-no-repeat"
				style="background-image: url('{url}')"
			/>
		</div>
	{:else}
		<div class="w-full h-full flex">
			<div class="m-auto">
				<ImageArea size="200" color="grey" />
			</div>
		</div>
	{/if}
</div>
