<script>
	import SelectEnv from '$lib/components/SelectEnv/index.svelte';
	import { page } from '$app/stores';
	import WithAuth from '$lib/components/auth/WithAuth.svelte';
	import CardView from '$lib/components/CardView/index.svelte';
	import { langDict } from '../../../../../../../stores/localizationStore';

	$: selectedEnvId = $page.params.envId !== 'null' ? $page.params.envId : null;
	$: selectedCardId = $page.params.cardId !== 'null' ? $page.params.cardId : null;
	$: extended = $page.params.extended === 'true';
	$: selectEnvOpen = $page.params.selectEnvOpen === 'true';

	$: console.log({ selectedEnvId, selectedCardId, extended, selectEnvOpen });
	let loaded = false;
</script>

<WithAuth
	onLoaded={() => {
		loaded = true;
	}}
>
	{#if !!selectedEnvId}
		<CardView {selectedEnvId} {selectedCardId} {extended} />
	{:else}
		<SelectEnv {selectEnvOpen} />
		{#if !selectEnvOpen && loaded}
			<div class="placeholder-text m-auto p-3 text-center">
				{$langDict.select_env.no_envs_no_env_selected}
			</div>
		{/if}
	{/if}
</WithAuth>
