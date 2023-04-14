<script>
	import DropDown from '$lib/components/utils/DropDown.svelte';
	import { select } from 'd3';
	let open = false;
	const colors = [
		'#4e79a7',
		'#f28e2c',
		'#e25759',
		'#77b6b2',
		'#58a04e',
		'#edc948',
		'#af7aa1',
		'#ff9da6',
		'#9c765e',
		'#b9b0ab'
	];
	export let color = null;
	export let onChange;
	const click = () => {
		open = !open;
		console.log('click');
	};
</script>

<DropDown {open}>
	<div class="p-2 border-2 cursor-pointer" slot="header" on:keydown={click} on:click={click}>
		{#if !!color}
			<div class="flex">
				<div>Selected Color</div>
				<div class="ml-auto w-6 h-6 border border-black" style="background:{color}" />
			</div>
		{:else}No Color - Please Select
		{/if}
	</div>
	<div slot="content" class="flex flex-wrap gap-2">
		{#each colors as c}
			<button on:click={() => onChange(c)} class="w-6 h-6" style="background:{c}" />
		{/each}
	</div>
</DropDown>
