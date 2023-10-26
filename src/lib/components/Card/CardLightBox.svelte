<script>
	import Modal from '$lib/components/utils/Modal.svelte';
	import Card from './Card.svelte';

	export let onClose;
</script>

<Modal isOpen={open}>
	<Card {...$$props} {onClose} cls="m-auto" />
</Modal>
