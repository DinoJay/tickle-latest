<script>
	import TreeLayout from './TreeLayout.svelte';
	import { titleLocale } from '../../../../stores/localizationStore';
	import * as d3 from 'd3';
	import RadialTreeLayout from './RadialTreeLayout.svelte';
	import HorizontalTree from './HorizontalTree.svelte';
	import RadialLayout from './RadialLayout.svelte';

	export let cards;
	export let selectedCardId;

	let width = null;
	let height = null;
	let pathCardIds = [];

	$: pathCardIds = [...pathCardIds, selectedCardId];

	$: console.log('pathCardIds', pathCardIds);

	$: H = pathCardIds.length * 300;

	// const radialLayout =
	const getSize = (node) => {
		const [w, h] = [node.offsetWidth, node.offsetHeight];
		width = w;
		height = h;
	};

	const cardObjs = cards.map((d) => ({
		...d,
		// title: d[$titleLocale],
		title: d.title_en || d.title_fr || d.title_nl || d.title,
		topics: d.topics.map((t) => ({ ...t, title: t[$titleLocale] })),
		topicIds: d.topics.map((t) => t.id)
	}));

	// console.log('cardObjs', cardObjs);
	const cardsWithLinks = cardObjs.map((d) => {
		///TODO take into account duplicates
		const nbsDups = d.topicIds
			.map((t) =>
				cardObjs.map((c) => {
					if (c.topicIds.includes(t)) {
						const topic = c.topics.find((t1) => t1.id === t);
						return { ...c, topic, color: topic.color };
					}
					return undefined;
				})
			)
			.flat()
			.filter((d) => d !== undefined);

		// console.log('nbs dups', nbsDups);

		const nbs = [...new Map(nbsDups.map((d) => [d.id, d])).values()];

		return { ...d, nbs };
	});

	$: makeTreeLayout = (card, path) => {
		const [firstId, ...restIds] = path;

		console.log('firstId', firstId);

		if (firstId === card.id) {
			const firstCard = cards.find((d) => d.id === firstId);
			const nbs = cards
				.filter((d) => firstCard.topicIds.find((t) => d.topicIds.includes(t)))
				.filter((c) => c.id !== firstCard.id);

			console.log('firsIds', firstId);
			console.log('nbs', nbs);

			const node = {
				...card,
				id: firstCard.id,
				name: firstCard.title,
				children: nbs.map((d) => makeTreeLayout(d, restIds))
			};

			return node;
		}

		return {
			...card,
			id: card.id,
			name: card.title,
			children: []
		};
	};

	$: card = cardsWithLinks.find((d) => d.id === selectedCardId);
	$: root = makeTreeLayout(
		cards.find((c) => c.id === pathCardIds[0]),
		pathCardIds
	);
	$: d3root = d3.hierarchy(root);

	// $: d3
	// 	.tree()
	// 	// .size([2 * Math.PI, 500])
	// 	.size([width, H])(d3root);

	$: console.log('card', card);
	$: console.log('d3roor', d3root);
	$: console.log('pathCardIds', pathCardIds);

	$: console.log('root', root);
	$: console.log('d3root', d3root);
	$: console.log('desc', d3root.descendants());
	// $: d3root.descendants().forEach((d) => {
	// 	d.y = d.depth * 100;
	// });
</script>

<div class="flex-grow" use:getSize>
	{#if width !== null && height !== null}
		<!-- <TreeLayout {...$$props} {width} height={H} data={d3root.descendants()} /> -->
		<div class="flex">
			<RadialLayout datum={root} {pathCardIds} {width} {height} />
		</div>
	{/if}
</div>
