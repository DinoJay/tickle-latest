<script>
	import { langDict } from './../../../stores/localizationStore.js';
	import EnvDetail from './EnvDetail.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import { goto } from '$app/navigation';

	export let envs;
	export let selectEnvOpen = false;
	export let linkPrefix = '/cardview/environment';
	export let onClose = () => {
		goto(`/cardview/environment/null/null/false/false`);
	};
	export let onEnvOpen = (id) => {
		goto(`/cardview/environment/${id}`);
	};
	export let isMandatory = false;

	let selectedEnvId = null;

	//todo: fix
	const elems = envs.map(() => null);
	$: {
		const i = envs.findIndex((c) => c.id === selectedEnvId);
		console.log('elem', elems[i]);
		setTimeout(() => {
			elems[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
		}, 500);
	}
	// $: console.log('elems', elems);
</script>

<LightBox
	isOpen={selectEnvOpen}
	close={onClose}
	fixedWidth={true}
	title={$langDict.select_env.title}
	{isMandatory}
>
	<div class="flex-1 h-12 flex flex-col overflow-y-auto">
		{#each envs as env, i (env.id)}
			<div bind:this={elems[i]}>
				<EnvDetail
					{linkPrefix}
					{onEnvOpen}
					{...env}
					visible={selectedEnvId === env.id}
					onClick={(id) => (selectedEnvId = id)}
				/>
			</div>
		{/each}
	</div>
	{#if envs.length === 0}
		<div class="text-center text-xl m-12">{$langDict.select_env.no_envs}</div>
	{/if}
</LightBox>
