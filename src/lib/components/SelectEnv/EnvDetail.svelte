<script>
	import { titleLocales } from '$lib/constants/locales.js';
	import { slide, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import Img from '$lib/components/utils/Img.svelte';
	import { descriptionLocales } from '$lib/constants/locales';
	import { locale } from 'svelte-i18n';

	/**
	 * @type {any}
	 */
	export let id;
	/**
	 * @type {any}
	 */
	export let title;
	/**
	 * @type {any}
	 */
	export let description;
	/**
	 * @type {{ url: any; }}
	 */
	export let img;
	export let openEnv;
	/**
	 * @type {any}
	 */
	export let visible;
	export let onClick = () => {};
</script>

<h2>
	<button
		on:click={() => {
			onClick(visible ? null : id);
		}}
	>
		<p class="flex items-center text-2xl">
			<span class="mr-1">{visible ? '🤯' : '🙂'}</span>
			<span>{$$props[titleLocales[$locale]] || title}</span>
		</p>
	</button>
</h2>
{#if visible}
	{#key id}
		<div class="my-2" transition:slide>
			<Img url={img?.url} style="height:20rem" cls="w-full object-contain" />
			<p class="my-3 overflow-y-hidden" style="max-height:8rem">
				{$$props[descriptionLocales[$locale]] || description}
			</p>
			<button
				class="w-full p-2 text-xl
						hover:bg-c-light-gray
						border border-black border-3"
				on:click={() => {
					goto(`/cardview/environment/${id}`);
				}}>Go!</button
			>
		</div>
	{/key}
{/if}
