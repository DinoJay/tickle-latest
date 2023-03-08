<script>
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import Img from '$lib/components/utils/Img.svelte';

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

<div class="overflow-y-auto">
	<h2>
		<button
			on:click={() => {
				onClick(visible ? null : id);
			}}
		>
			<p class="flex items-center text-xl">
				<span class="mr-1 ">{visible ? '🤯' : '🙂'}</span>
				<span>{title}</span>
			</p>
		</button>
	</h2>
	{#if visible}
		{#key id}
			<div class="my-2" transition:fade>
				<Img url={img?.url} style="height:20rem" cls="w-full object-contain" />
				<div>
					<p class="my-3 overflow-y-auto" style="max-height:12rem">
						{description}
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
			</div>
		{/key}
	{/if}
</div>
