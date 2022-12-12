<script>
	import '../app.css';
	import Notifications from '$lib/components/Notifications/index.svelte';
	import NavigationBar from '$lib/components/navigationBar/NavigationBar.svelte';
	import ListenAuth from '$lib/components/auth/utils/ListenAuth.svelte';
	const w = 800;
	export const ssr = false;
</script>

<ListenAuth>
	<Notifications>
		<div class="flex flex-col">
			<div
				class="mx-auto flex flex-col flex-grow"
				style="min-width:800px; max-width:800px; min-height:800px"
			>
				<NavigationBar />
				<slot />
			</div>
		</div>
		<div class="" id="modals" />
		<div id="notifications" />
	</Notifications>
</ListenAuth>

<style>
</style>
