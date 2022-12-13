<script>
	import { afterUpdate } from 'svelte';
	import { store } from '/src/stores/index';
	import EnvDetail from './EnvDetail.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';

	export let isOpen = false;
	export let isMandatory = false;
	export let envs;

	let selectedEnvId = null;
	$: console.log('envs', envs);

	const elems = envs.map(() => null);
	afterUpdate(() => {
		const i = envs.findIndex((c) => c.id === selectedEnvId);
		elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
	});
</script>

<LightBox {isOpen} close={() => (isOpen = false)} {isMandatory}>
	<div class="flex-grow flex flex-col overflow-y-auto">
		<h2 class="text-3xl mb-1 text-c-black">Welcome to TICKLE!</h2>

		<div class="grow overflow-y-auto">
			{#each envs as env}
				<EnvDetail
					{...env}
					visible={selectedEnvId === env.id}
					onClick={(id) => (selectedEnvId = id)}
				/>
			{/each}
		</div>
	</div>
</LightBox>
