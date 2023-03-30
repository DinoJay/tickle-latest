<script>
	import { transition } from 'd3-transition';
	import { modalPortal } from '$lib/portalAction';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import TurnIcon from 'svelte-material-icons/ArrowULeftTop.svelte';
	import { blur, fly, fade } from 'svelte/transition';
	import { afterUpdate } from 'svelte';
	import FlipCard from '../Card/FlipCard.svelte';
	import { v4 as uuidv4 } from 'uuid';

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

	// function slide(node, { delay, duration }) {
	// 	const style = getComputedStyle(node);
	// 	const transform = style.transform === 'none' ? '' : style.transform;
	// 	const transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`;

	// 	return {
	// 		delay,
	// 		duration,
	// 		css: (t, u) => `
	//     transform: ${transform} translateY(${(1 - t) * 100}%);
	//     transition: ${u === 'in' ? transition : ''};
	//   `
	// 	};
	// }

	afterUpdate(() => {
		const body = document.body.style;

		// const modalDivs = document.querySelector('#modals');

		if (isOpen) {
			body.setProperty('touch-action', 'none');
			body.setProperty('overscroll-behavior', 'none');
			body.setProperty('overflow', 'hidden');

			return;
		} else {
			body.setProperty('touch-action', 'auto');
			body.setProperty('overscroll-behavior', 'auto');
			body.setProperty('overflow', 'auto');
		}
	});
</script>

{#if isOpen}
	<div
		on:keydown={() => null}
		use:modalPortal
		class="fixed overflow-auto modal cont w-full h-full flex z-50"
		transition:blur
		on:click={(e) => {
			if (!isMandatory) {
				e.stopPropagation();
				// close();
			}
		}}
	>
		<FlipCard
			style="{!!height ? `max-height:${height}px` : 'height:200px'}; max-width:{width}px"
			cls="m-auto drop-shadow-xl {!!height ? 'h-full' : ''} w-full {flipCls}"
			{flipped}
		>
			<div
				class="bg-white  h-full w-full flex flex-col p-3"
				slot="front"
				on:keydown={() => null}
				on:click={(e) => e.stopPropagation()}
			>
				<div class=" flex mb-3 items-start ">
					<div
						class="text-xl {!titleExpanded ? 'crop' : ''} transition uppercase cursor-pointer"
						on:click={() => (titleExpanded = !titleExpanded)}
						on:keydown={() => (titleExpanded = !titleExpanded)}
						style="max-width:90%"
					>
						{title}
					</div>
					{#if !isMandatory}
						{#if flippable}
							<button on:click={onFlip} class=" ml-auto">
								<TurnIcon size="1.5em" />
							</button>
						{/if}
						<button on:click={close} class={flippable ? 'ml-3' : 'ml-auto'}>
							<WindowClose size="1.5em" />
						</button>
					{/if}
				</div>

				{#if flippable}
					<slot name="front" />
				{:else}
					<slot />
				{/if}
			</div>
			<div slot="back" class={`${backCls} bg-white flex flex-col h-full w-full p-3`}>
				{#if $$slots.back && $$slots.front}
					<div class=" flex mb-3">
						<div class="text-xl crop uppercase" style="max-width:90%">{title}</div>
						{#if !isMandatory}
							<button on:click={onFlip} class=" ml-auto">
								<TurnIcon size="1.5em" />
							</button>
							{#if flippable}
								<button on:click={close} class="ml-3 ">
									<WindowClose size="1.5em" />
								</button>
							{/if}
						{/if}
					</div>
					<slot name="back" />
				{/if}
			</div>
		</FlipCard>
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
		will-change: transform;
	}
</style>
