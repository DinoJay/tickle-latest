<script>
	export let user;
	export let card;
	export let onDelete;
	export let id;
</script>

<div class="p-1 border-2 flex">
	<div><span class="italic">{user.email}</span> acquired Card "{card.title}"</div>
	<button class="ml-auto" on:click={() => onDelete(id)}>X</button>
</div>
