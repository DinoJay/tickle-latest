<script>
	import SelectEnv from '$lib/components/SelectEnv/index.svelte';
	import { page } from '$app/stores';
	import WithAuth from '$lib/components/auth/WithAuth.svelte';
	import CardView from '$lib/components/CardView/index.svelte';

	$: selectedEnvId = $page.params.envId;
	$: selectedCardId = $page.params.cardId || null;
	$: extended = $page.params.extended || null;
</script>

<WithAuth>
	{#if !!selectedEnvId}
		<CardView {selectedEnvId} {selectedCardId} {extended} />
	{:else}
		<SelectEnv isOpen={true} isMandatory={true} />
	{/if}
</WithAuth>
