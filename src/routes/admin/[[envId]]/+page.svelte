<script>
	import Admin from '$lib/components/Admin/index.svelte';

	import WithAuth from '$lib/components/auth/WithAuth.svelte';
	import { page } from '$app/stores';

	$: envId = $page.params.envId;
</script>

<!-- {#await import('../../../lib/components/auth/WithAuth.svelte') then WithAuth} -->
<WithAuth>
	<Admin {envId} />
</WithAuth>
<!-- {/await} -->
