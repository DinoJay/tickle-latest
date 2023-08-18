<script>
	import Img from '$lib/components/utils/Img.svelte';
	export let title = '';
	export let img = '';
	export let answers = [];
	export let text = '';
	export let onChange = () => {};
	export let counter = 0;

	// $: if (counter) {
	// 	if (window.document)
	// 		window.document.querySelectorAll('input').forEach((item) => (item.checked = false));
	// }
	let response = answers.reduce((acc, cur) => ({ ...acc, [cur.text]: false }), {});
</script>

<div class="overflow-y-auto flex flex-col w-full ">
	<h2 class="text-xl mb-2">{title}</h2>
	{#if img}
		<!-- <img class="object-cover w-full flex-grow shrink" style="max-height:200px" src={img.url} /> -->
		<Img url={img?.url} style="height:20rem" cls="w-full " />
	{/if}
	{#if !img}
		<div style="height:200px" class="flex "><div class="m-auto">No Image</div></div>
	{/if}

	<div class="p-2">
		<p class="text-xl">{text}</p>
		<div class="mt-2 ok">
			{#each answers as a (a.text)}
				<div class="text-lg text-gray-600">
					<input
						type="checkbox"
						bind:checked={response[a.text]}
						id={a.id}
						on:change={(e) => {
							onChange(response);
						}}
					/>
					<label for={a.id}> {a.text}</label><br />
				</div>
			{/each}
		</div>
	</div>
</div>
