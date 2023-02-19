<script>
	import { portal } from '$lib/portalAction';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import TurnIcon from 'svelte-material-icons/ArrowULeftTop.svelte';
	import { blur } from 'svelte/transition';
	import FlipCard from '../Card/FlipCard.svelte';

	export let isOpen = false;
	export let close;
	export let onFlip = () => false;
	export let isMandatory = false;
	export let height = 600;
	export let width = 400;
	export let title = '';
	export let cls = '';
	export let backCls;
	export let flipped = false;
	export let flipCls = '';

	$: flippable = $$slots.front && $$slots.back;
</script>

{#if isOpen}
	<div
		transition:blur
		on:keydown={() => null}
		use:portal={'modals'}
		class="fixed modal cont w-full h-full flex drop-shadow-2xl"
		on:click={(e) => {
			if (!isMandatory) {
				e.stopPropagation();
				// close();
			}
		}}
	>
		<FlipCard
			style="max-height:{height}px;max-width:{width}px"
			cls="m-auto bg-white h-screen w-screen {flipCls}"
			{flipped}
		>
			<div
				class="bg-white  h-full w-full flex flex-col p-3"
				slot="front"
				on:keydown={() => null}
				on:click={(e) => e.stopPropagation()}
			>
				<div class=" flex mb-3">
					<div class="text-xl crop uppercase" style="max-width:90%">{title}</div>
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

				<div class="flex-grow flex flex-col w-full overflow-y-auto {cls}">
					{#if flippable}
						<slot name="front" />
					{:else}
						<slot />
					{/if}
				</div>
			</div>
			<div slot="back" class={`${backCls} flex flex-col h-full w-full`}>
				{#if $$slots.back && $$slots.front}
					<div class="bg-white  h-full w-full flex flex-col p-3">
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
					</div>
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
		@apply z-50;
	}
	.cont {
		background: rgba(240, 248, 255, 0.86);
	}
</style>
