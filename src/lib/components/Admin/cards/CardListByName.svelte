<script>
	import PreviewCard from '$lib/components/PreviewCard.svelte';

	export let cards;
	export let onClick;

	const itemsPerPage = 9;
	let currentPage = 1;
	$: numPages = Math.ceil(cards.length / itemsPerPage);
	$: currentItems = cards.slice(currentPage - 1, currentPage + itemsPerPage - 1);

	const abc = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z'
	];

	console.log('cards', cards);
	let searchStr = '';
	$: filtered = cards.filter((c) => c.title.toLowerCase().startsWith(searchStr.toLowerCase()));
	$: nested = abc
		.map((l) => ({
			key: l,
			values: filtered.filter((c) => {
				return !!c.title.toLowerCase().startsWith(l);
			})
		}))
		.filter((d) => d.values.length > 0);
	$: console.log('nested', nested);
</script>

{#if cards.length > 0}
	<input bind:value={searchStr} class="border-2 p-2 mb-2" placeholder="Search" />
	<div class="flex-grow flex flex-col overflow-y-auto ">
		{#each nested as n}
			<div class="mb-3">
				<h2 class="text-gray-500 text-2xl">{n.key.toUpperCase()}</h2>
				<ul class="ml-3">
					{#each n.values as c}
						<li class="cursor-pointer" on:click={() => onClick(c)}>{c.title}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
{/if}
