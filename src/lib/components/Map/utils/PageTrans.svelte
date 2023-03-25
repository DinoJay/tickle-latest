<script>
	import { fly } from 'svelte/transition';
	export let refresh = '';
	export let style = '';
	export let cls = '';
</script>

{#key refresh}
	<div
		class={cls}
		{style}
		in:fly={{ x: -5, duration: 500, delay: 500 }}
		out:fly={{ x: 5, duration: 500 }}
	>
		<slot />
	</div>
{/key}
