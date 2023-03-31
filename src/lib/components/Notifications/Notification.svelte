<script>
	import { portal } from '$lib/portalAction';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import { fade, slide, fly, blur } from 'svelte/transition';
	// export let style;
	// export let className;
	// export let alt;
	// export let open = false;
	export let close;
	export let type = 'warning';

	const types = { info: '', warning: 'bg-red-500 text-white', success: 'bg-green-500 text-white' };

	$: console.log('type', type);
</script>

<!-- {#if open} -->
<div
	transition:blur
	use:portal={'#notifications'}
	role="button"
	class="fixed noti-pos cont w-full h-full flex drop-shadow-2xl"
	on:click={(e) => {
		console.log('e', e);
		e.stopPropagation();
		close();
	}}
	on:keydown={(e) => {
		console.log('e', e);
		e.stopPropagation();
		close();
	}}
>
	<div class="m-auto bg-white flex p-4 items-center {types[type]}">
		<!-- <button on:click={close} class="absolute right-0 p-3"><WindowClose size="1.5em" /> </button> -->
		<slot />
		<button
			on:click={close}
			class="ml-2 border-l-2 "
			class:border-white={type !== 'info'}
			class:border-black={type === 'info'}><WindowClose size="1.5em" /></button
		>
	</div>
</div>

<!-- {/if} -->
<style>
	.noti-pos {
		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);
		@apply z-50;
	}
</style>
