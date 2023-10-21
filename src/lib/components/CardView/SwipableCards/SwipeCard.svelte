<script>
	export let isCurrent;
	export let cardContent;
</script>

<div
	class="card w-48 h-48 absolute bg-white"
	data-dragging="false"
	data-status={isCurrent === true ? 'current' : 'waiting'}
>
	<span class="card_content">{cardContent}</span>
</div>
