<script>
	import LightBox from './LightBox.svelte';

	import { popUpStore } from '/src/stores/popUpStore';

	const close = () => popUpStore.update((n) => ({ ...n, open: false }));
</script>

<LightBox isOpen={$popUpStore.open} {close} title={$popUpStore.title}>
	<p class="text-gray-600 text-lg mb-3">
		{$popUpStore.text}
	</p>
	<div class="flex">
		<button
			class="btn mr-1 flex-grow"
			on:click={() => {
				$popUpStore.onConfirm();
				close();
			}}>Okay</button
		>

		<button class="btn flex-grow" on:click={close}>Cancel</button>
	</div>
</LightBox>
