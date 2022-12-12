<script>
	export let title;
	export let description;
	export let img;
</script>

<div style="height:200px;max-width:150px">
	<h2>{title}</h2>
	<img src={img?.url} />
</div>
