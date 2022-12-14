<script>
	import { page } from '$app/stores';
	import WithAuth from '$lib/components/auth/WithAuth.svelte';
	import CardView from '$lib/components/CardView/index.svelte';

	$: selectedEnvId = $page.params.slug;
</script>

<WithAuth>
	<CardView {selectedEnvId} />
</WithAuth>
