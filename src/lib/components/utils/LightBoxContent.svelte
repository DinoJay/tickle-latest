<script>
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import TurnIcon from 'svelte-material-icons/ArrowULeftTop.svelte';
	import FlipCard from '../Card/FlipCard.svelte';
	import { onMount, onDestroy } from 'svelte';

	/**
	 * @type {(arg0: any) => void}
	 */
	export let close;
	export let onFlip = () => false;
	export let isMandatory = false;
	/**
	 * @type {string|null}
	 */
	export let height = '700px';
	export let width = '450px';
	export let title = '';
	// export let cls = '';
	export let backCls = '';
	export let flipped = false;
	export let flipCls = '';
	export let fixedHeight = false;

	export let isDefaultSlot = false;
	export let isFrontSlot = false;
	export let isBackSlot = false;

	export let fixedWidth = false;

	$: flippable = isFrontSlot && isBackSlot;
	let titleExpanded = false;
</script>

<div
	class="bg-white flex flex-col p-3 m-auto card-width w-auto max-h-full"
	class:h-full={fixedHeight}
	style:width={fixedWidth ? width : null}
	on:keydown={() => null}
	on:click={(e) => e.stopPropagation()}
>
	<div class=" flex mb-3 items-start">
		<div
			class="text-xl flex {!titleExpanded ? 'crop' : ''} transition uppercase cursor-pointer"
			on:click={() => (titleExpanded = !titleExpanded)}
			on:keydown={() => (titleExpanded = !titleExpanded)}
			style="max-width:90%"
		>
			<h1>
				{title}
			</h1>
		</div>
		{#if !isMandatory}
			<button on:click={close} class={flippable ? 'ml-3' : 'ml-auto'}>
				<WindowClose size="1.5em" />
			</button>
		{/if}
	</div>
	<slot />
</div>

<style>
	.width {
		width: 450px;
	}
	@screen sm {
		.width {
			width: auto;
			min-width: 450px;
		}
	}
</style>
