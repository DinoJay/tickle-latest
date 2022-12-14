<script>
	import DropDown from '$lib/components/utils/DropDown.svelte';
	import { select } from 'd3';
	let open = false;
	const colors = [
		'#1f77b4',
		'#ff7f0e',
		'#2ca02c',
		'#d62728',
		'#9467bd',
		'#8c564b',
		'#e377c2',
		'#7f7f7f',
		'#bcbd22',
		'#17becf'
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
