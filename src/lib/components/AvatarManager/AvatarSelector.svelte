<script>
	import avatars from '$lib/components/avatarManager/avatars';

	export let userAvatar = null;
	export let onChange;

	$: console.log('userAvatar', avatars);
</script>

<h2 class="text-lg mb-1">Choose your Avatar:</h2>
<div class="flex  overflow-visible flex-wrap">
	{#each avatars as av}
		<img
			class="cursor-pointer transition-all {userAvatar === av ? 'w-20' : 'w-16'}"
			on:click={() => {
				onChange(av);
			}}
			on:keydown={() => onChange(av)}
			src={'/avatars/' + av + '.svg'}
			alt={av}
		/>
	{/each}
</div>
