<script>
	import SelectEnv from '$lib/components/SelectEnv/index.svelte';
	import { page } from '$app/stores';
	import WithAuth from '$lib/components/auth/WithAuth.svelte';
	import Diary from '$lib/components/Diary/index.svelte';

	$: selectedEnvId = $page.params.envId;
	$: selectedCardId = $page.params.cardId || null;
	$: extended = $page.params.extended || null;
	$: console.log('#page params', $page.params);
</script>

<WithAuth>
	<Diary {selectedEnvId} {selectedCardId} {extended} />
</WithAuth>
