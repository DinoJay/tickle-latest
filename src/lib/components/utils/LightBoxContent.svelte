<script>
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import TurnIcon from 'svelte-material-icons/ArrowULeftTop.svelte';
	import FlipCard from '../Card/FlipCard.svelte';

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

	export let isDefaultSlot = false;
	export let isFrontSlot = false;
	export let isBackSlot = false;

	$: flippable = isFrontSlot && isBackSlot;
	let titleExpanded = false;

	// console.log('$$slots', $$slots);
</script>

{#if isFrontSlot && isBackSlot}
	<FlipCard
		style="{!!height ? `max-height:${height}` : 'height:330px'}; max-width:{width}"
		cls="m-auto drop-shadow-xl {!!height ? 'h-full' : ''} w-full {flipCls} overflow-hidden"
		{flipped}
	>
		<div
			class="bg-white h-full w-full flex flex-col p-3"
			slot="front"
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

			{#if flippable && !isDefaultSlot}
				<slot name="front" />
			{:else}
				<slot />
			{/if}
		</div>
		<div slot="back" class={`${backCls} bg-white flex flex-col h-full w-full p-3`}>
			{#if isBackSlot && isFrontSlot}
				<div class=" flex mb-3">
					<div class="text-xl crop uppercase" style="max-width:90%">{title}</div>
					{#if !isMandatory}
						<button on:click={onFlip} class=" ml-auto">
							<TurnIcon size="1.5em" />
						</button>
						{#if flippable}
							<button on:click={close} class="ml-3">
								<WindowClose size="1.5em" />
							</button>
						{/if}
					{/if}
				</div>
				<slot name="back" />
			{/if}
		</div>
	</FlipCard>
{:else if isDefaultSlot}
	<div
		class="bg-white flex flex-col p-3 m-auto width"
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
{/if}

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
