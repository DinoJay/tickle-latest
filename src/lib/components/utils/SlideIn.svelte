<script>
	import { slide } from 'svelte/transition';

	let visible = false;
	export let cls = '';

	// onMount(() => {
	// 	var checkList = document.getElementById('list1');
	// 	checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
	// 		if (checkList.classList.contains('visible')) checkList.classList.remove('visible');
	// 		else checkList.classList.add('visible');
	// 	};
	// });
</script>

<div id="list1" class="dropdown-check-list w-full visible {cls}">
	<span
		class="w-full anchor border-b-2"
		on:keydown={() => (visible = !visible)}
		on:click={() => (visible = !visible)}><slot name="title" /></span
	>
	{#if visible}
		<ul
			on:click={() => (visible = false)}
			on:keydown={() => (visible = false)}
			transition:slide
			class="items max-h-80 overflow-y-auto p-1"
		>
			<slot />
		</ul>
	{/if}
</div>

<style>
	.dropdown-check-list {
		display: inline-block;
	}

	.dropdown-check-list .anchor {
		position: relative;
		cursor: pointer;
		display: inline-block;
		padding: 2px 50px 2px 5px;
	}

	.dropdown-check-list .anchor:after {
		position: absolute;
		content: '';
		border-left: 2px solid black;
		border-top: 2px solid black;
		padding: 5px;
		right: 10px;
		top: 20%;
		transform: rotate(-135deg);
	}

	.dropdown-check-list .anchor:active:after {
		right: 8px;
		top: 21%;
	}

	/* .dropdown-check-list ul.items {
		padding: 2px;
		display: none;
		margin: 0;
		border: 1px solid #ccc;
		border-top: none;
	} */

	.dropdown-check-list ul.items li {
		list-style: none;
	}

	/* .dropdown-check-list.visible .anchor {
		color: #0094ff;
	} */

	.dropdown-check-list.visible .items {
		display: block;
	}
</style>
