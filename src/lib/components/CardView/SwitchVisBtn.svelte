<script>
	import { transition } from 'd3-transition';
	import CompassOutline from 'svelte-material-icons/CompassOutline.svelte';
	import Poll from 'svelte-material-icons/Poll.svelte';
	import Dots from 'svelte-material-icons/DotsHexagon.svelte';
	export let selected;
	export let all;
	export let onClick;
	import { fly } from 'svelte/transition';

	let extended = false;

	const GEOMAP = 'map';
	const TOPICMAP = 'topicmap';
	const UPSET = 'upset';
</script>

<div class="absolute bottom-8 right-5">
	{#if extended}
		<div transition:fly>
			{#each all.filter((d) => d !== selected) as t}
				<button
					on:click={() => {
						onClick(t);
						extended = false;
					}}
					class=" z-20 flex items-center p-2 mb-1 border-2 border-black rounded-full"
				>
					{#if t === GEOMAP}
						<span class="m-auto spinner "> <CompassOutline size={32} /></span>
					{/if}
					{#if t === TOPICMAP}
						<span class="m-auto "> <Dots size={32} /></span>
					{/if}
					{#if t === UPSET}
						<span class="m-auto "> <Poll size={32} /></span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}

	<button
		on:click={() => (extended = !extended)}
		class=" z-20 flex items-center p-2 border-2 border-black rounded-full"
	>
		{#if selected === GEOMAP}
			<span class="m-auto "> <CompassOutline size={32} /></span>
		{/if}
		{#if selected === TOPICMAP}
			<span class="m-auto "> <Dots size={32} /></span>
		{/if}
		{#if selected === UPSET}
			<span class="m-auto "> <Poll size={32} /></span>
		{/if}
	</button>
</div>

<style>
	.spinner {
		animation-duration: 3s;
		animation-name: spin;
		animation-iteration-count: infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		80% {
			transform: rotate(240deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
