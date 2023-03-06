<script>
	import { goto } from '$app/navigation';
	import Signin from '$lib/components/auth/Signin.svelte';
	import { store } from '/src/stores/index';

	// $: {
	// 	console.log('$store', $store.currentUser);
	// 	if (!!$store.currentUser) goto('/cardview/environment');
	// }
</script>

<Signin />

<style>
</style>
