<script>
	import CompassOutline from 'svelte-material-icons/CompassOutline.svelte';
	export let selected;
	export let all;
	export let onClick;
</script>

<button
	on:click={onClick}
	class=" flex items-center p-2 absolute bottom-8 right-5 
		border-2 border-black rounded-full"
>
	{#if selected === all[0]}
		<span class="m-auto spinner"> <CompassOutline size={32} /></span>
	{/if}
	{#if selected === all[1]}
		<span class="m-auto spinner"> <CompassOutline size={32} /></span>
	{/if}
	{#if selected === all[2]}
		<span class="m-auto spinner"> <CompassOutline size={32} /></span>
	{/if}
</button>

<style>
	.spinner {
		animation-duration: 3s;
		animation-name: spin;
		animation-iteration-count: infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		80% {
			transform: rotate(240deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
