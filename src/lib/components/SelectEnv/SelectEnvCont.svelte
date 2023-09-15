<script>
	import { afterUpdate } from 'svelte';
	import EnvDetail from './EnvDetail.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import SimpleLightBox from '../utils/SimpleLightBox.svelte';
	import { flip } from 'svelte/animate';
	import { _ } from 'svelte-i18n';

	export let isOpen = false;
	export let isMandatory = false;
	export let envs;

	let selectedEnvId = null;
	$: console.log('envs', envs);

	//todo: fix
	const elems = envs.map(() => null);
	$: {
		const i = envs.findIndex((c) => c.id === selectedEnvId);
		console.log('elem', elems[i]);
		setTimeout(() => {
			elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
		}, 200);
	}
	// $: console.log('elems', elems);
</script>

<SimpleLightBox {isOpen} close={() => (isOpen = false)} {isMandatory} cls="flex-grow">
	<h2 class="text-3xl mb-1 text-c-black">{$_('select_env.title')}</h2>

	<div class="flex-grow flex flex-col overflow-y-auto">
		{#each envs as env, i (env.id)}
			<div bind:this={elems[i]}>
				<EnvDetail
					{...env}
					visible={selectedEnvId === env.id}
					onClick={(id) => (selectedEnvId = id)}
				/>
			</div>
		{/each}
	</div>
</SimpleLightBox>
