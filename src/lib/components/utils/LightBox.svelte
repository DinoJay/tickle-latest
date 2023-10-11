<script>
	import { flip } from 'svelte/animate';
	import { modalPortal } from '$lib/portalAction';
	import { blur, fly, fade } from 'svelte/transition';
	import { afterUpdate } from 'svelte';
	import LightBoxContent from './LightBoxContent.svelte';
	// import { v4 as uuidv4 } from 'uuid';

	export let isOpen = false;
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

	afterUpdate(() => {
		const body = document.body.style;

		// const modalDivs = document.querySelector('#modals');

		// if (isOpen) {
		// 	body.setProperty('touch-action', 'none');
		// 	body.setProperty('overscroll-behavior', 'none');
		// 	body.setProperty('overflow', 'hidden');

		// 	return;
		// } else {
		// 	body.setProperty('touch-action', 'auto');
		// 	body.setProperty('overscroll-behavior', 'auto');
		// 	body.setProperty('overflow', 'auto');
		// }
	});
	$: console.log('$$slots', $$slots);
</script>

{#if isOpen}
	<div
		on:keydown={() => null}
		use:modalPortal
		class="fixed modal cont w-full h-full flex z-50"
		transition:blur
		on:click={(/** @type {{ stopPropagation: () => void; }} */ e) => {
			if (!isMandatory) {
				e.stopPropagation();
				// close();
			}
		}}
	>
		<LightBoxContent
			{height}
			{width}
			{title}
			{backCls}
			{flipped}
			{flipCls}
			{close}
			{onFlip}
			{isMandatory}
			isDefaultSlot={$$slots.default}
			isFrontSlot={$$slots.front}
			isBackSlot={$$slots.back}
		>
			<slot name="front" slot="front" />
			<slot name="back" slot="back" />
			<slot />
		</LightBoxContent>
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
