<script>
	import avatars from '$lib/components/avatarManager/avatars';

	export let userAvatar = null;
	export let onChange;
</script>

<div class="flex overflow-visible flex-wrap justify-between">
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
