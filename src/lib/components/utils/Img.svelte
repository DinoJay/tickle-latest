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

<div {style} class={cls}>
	{#if !!url}
		<!-- <img src={url} alt={title} class="w-full object-contain h-full" /> -->
		<div
			class="h-full w-full bg-contain bg-center bg-no-repeat"
			style="background-image: url('{url}')"
		/>
	{:else}
		<div class="w-full  h-full flex">
			<div class="m-auto">
				<ImageArea size="200" color="grey" />
			</div>
		</div>
	{/if}
</div>
