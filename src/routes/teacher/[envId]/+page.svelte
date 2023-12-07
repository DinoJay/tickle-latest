<script>
	import TeacherControl from '$lib/components/TeacherControl/index.svelte';

	import WithAuth from '$lib/components/auth/WithAuth.svelte';
	import { page } from '$app/stores';

	$: envId = $page.params.envId;
</script>

<!-- {#await import('../../../lib/components/auth/WithAuth.svelte') then WithAuth} -->
<WithAuth>
	<TeacherControl {envId} />
</WithAuth>
<!-- {/await} -->
