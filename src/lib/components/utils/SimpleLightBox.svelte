<script>
	import { modalPortal } from '$lib/portalAction';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import TurnIcon from 'svelte-material-icons/ArrowULeftTop.svelte';
	import { blur } from 'svelte/transition';
	import FlipCard from '../Card/FlipCard.svelte';

	export let isOpen = false;
	/**
	 * @type {(arg0: any) => void}
	 */
	export let close;
	export let onFlip = () => false;
	export let isMandatory = false;
	export let height = 700;
	export let width = 450;
	export let title = '';
	export let cls = '';
	export let backCls = '';
	export let flipped = false;
	export let flipCls = '';

	$: flippable = $$slots.front && $$slots.back;
	let titleExpanded = false;
</script>

{#if isOpen}
	<div
		transition:blur
		on:keydown={() => null}
		use:modalPortal
		class="fixed overflow-auto modal cont w-full h-full flex z-50"
		on:click={(e) => {
			if (!isMandatory) {
				e.stopPropagation();
				// close();
			}
		}}
	>
		<div
			class="m-auto bg-white w-full h-full overflow-y-scroll p-3 flex flex-col"
			style="max-height:{height}px;max-width:{width}px"
		>
			<div class=" flex mb-3 items-start ">
				{#if !!title}
					<div
						class="text-xl {!titleExpanded ? 'crop' : ''} transition uppercase cursor-pointer"
						on:click={() => (titleExpanded = !titleExpanded)}
						on:keydown={() => (titleExpanded = !titleExpanded)}
						style="max-width:90%"
					>
						{title}
					</div>
				{/if}
				{#if !isMandatory}
					<button on:click={close} class={'ml-auto'}>
						<WindowClose size="1.5em" />
					</button>
				{/if}
			</div>
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal {
		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);
	}
	.cont {
		background: rgba(240, 248, 255, 0.86);
	}
</style>
