<script>
	import avatars from '$lib/components/avatarManager/avatars';

	export let userAvatar = null;
	export let onChange;
</script>

<div class="flex h-[5rem] overflow-visible">
	{#each avatars as av}
		<img
			class="w-[4rem] h-[4rem] {userAvatar === av ? 'scale-125' : 'scale-100'}"
			on:click={() => {
				onChange(av);
			}}
			src={'/avatars/' + av + '.svg'}
			alt={av}
		/>
	{/each}
</div>
