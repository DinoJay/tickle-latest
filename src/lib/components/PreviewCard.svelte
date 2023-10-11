<script>
	import { titleLocales } from '$lib/constants/locales';

	import { locale } from 'svelte-i18n';

	export let img = { url: '' };
	export let title;
	export let onClick = (d) => d;
	export let className = '';
	export let highlighted = false;
</script>

<div
	on:click={onClick}
	on:keydown={onClick}
	class="flex flex-col h-32 w-24 sm:h-36 sm:w-28 p-2 relative bg-white drop-shadow-md cursor-pointer hover:scale-105 transition-all overflow-visible {className}"
>
	{#if !!title || $$props[titleLocales[$locale]]}
		<h1 class="shrink-0 title">
			{title || $$props[titleLocales[$locale]] || 'No Title'}
		</h1>
	{:else}
		<div class="ph-row">
			<div class="ph-col-12 big" />
		</div>
	{/if}
	{#if !!img?.url}
		<div
			class="mt-1 flex-grow bg-cover"
			style="background-image: url({img?.url});
			filter:{!highlighted ? 'grayscale(100%)' : ''}"
		/>
	{:else}
		<div class="flex-grow flex flex-col mt-1">
			<div class="flex-grow bg-gray-300" />
		</div>
	{/if}
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
