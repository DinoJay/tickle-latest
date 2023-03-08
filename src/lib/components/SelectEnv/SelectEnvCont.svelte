<script>
	import { afterUpdate } from 'svelte';
	import EnvDetail from './EnvDetail.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';

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
			elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'start' });
		}, 200);
	}
	// $: console.log('elems', elems);
</script>

<LightBox {isOpen} close={() => (isOpen = false)} {isMandatory} cls="flex-grow overflow-y-auto">
	<div class="flex-grow flex flex-col overflow-y-auto">
		<h2 class="text-3xl mb-1 text-c-black">Welcome to TICKLE!</h2>

		<div class="flex-grow flex flex-col overflow-y-auto">
			{#each envs as env, i}
				<div bind:this={elems[i]}>
					<EnvDetail
						{...env}
						visible={selectedEnvId === env.id}
						onClick={(id) => (selectedEnvId = id)}
					/>
				</div>
			{/each}
		</div>
	</div>
</LightBox>
