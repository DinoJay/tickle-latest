<script>
	import EditQuestion from './EditQuestion.svelte';

	let sq = { id: null, answers: [], img: { url: null, name: null }, text: '' };

	export let onClose;
	export let onCreate;
	export let open;
</script>

<EditQuestion
	{open}
	q={sq}
	onCreate={() => {
		onCreate(sq);
		sq = { id: null, answers: [], img: { url: null, name: null }, text: '' };
	}}
	onChange={(q) => (sq = q)}
	{onClose}
/>
