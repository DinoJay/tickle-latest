<script>
	import { portal } from '$lib/portalAction';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';
	import { blur } from 'svelte/transition';

	export let isOpen = false;
	export let close = () => {};
	export let isMandatory = false;
	export let height = 500;
	export let width = 400;
	export let title = '';
	export let cls = '';
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
				close();
			}
		}}
	>
		<div on:keydown={() => null} class="m-auto bg-white p-3" on:click={(e) => e.stopPropagation()}>
			{#if !isMandatory}
				<div class=" flex mb-3">
					<div class="text-xl crop" style="max-width:{width - 20}px">{title}</div>
					<button on:click={close} class=" ml-auto">
						<WindowClose size="1.5em" />
					</button>
				</div>
			{/if}

			<div class="flex flex-col {cls}" style="height:{height}px;width:{width}px">
				<slot />
			</div>
		</div>
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
