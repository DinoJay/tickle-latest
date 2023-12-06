<script>
	import DeleteIcon from 'svelte-material-icons/Delete.svelte';

	export let user;
	export let card;
	export let onDelete;
	export let id;
</script>

<div class="p-1 flex">
	<div><span class="italic">{user.email}</span> acquired Card "{card.title}"</div>
	<button class="ml-auto" on:click={() => onDelete(id)}><DeleteIcon /></button>
</div>
