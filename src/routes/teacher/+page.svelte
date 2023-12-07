<script>
	import SelectEnv from '$lib/components/SelectEnv/index.svelte';
	import WithAuth from '$lib/components/auth/WithAuth.svelte';
	import TinyEnvSelect from '$lib/components/utils/TinyEnvSelect.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: envId = $page.params.envId;
</script>

<WithAuth>
	<SelectEnv
		selectEnvOpen={true}
		onEnvOpen={(id) => {
			goto(`/teacher/${id}`);
		}}
		onClose={() => {
			goto('/cardview/environment/null/null/false/true');
		}}
	/>
</WithAuth>
