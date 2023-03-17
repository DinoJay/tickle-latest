<script>
	import MobileKeyboard from './MobileKeyboard.svelte';
	import Confetti from 'svelte-confetti';

	export let hint;
	/**
	 * @type {any[]}
	 */
	export let wordList;
	/**
	 * @type {(arg0: any[]) => void}
	 */
	export let onChange;

	export let errors;
	export let succeeded;
</script>

<p class="text-xl">{hint}</p>

{#if !succeeded}
	{#if errors < 5}
		<div class="text-7xl flex flex-wrap gap-4 m-auto text-gray-600">
			{#each wordList as l}
				{#if l.visible}
					<div>{l.letter}</div>
				{:else}
					<div>_</div>
				{/if}
			{/each}
		</div>
		{#if errors > 0}
			<div class="text-xl mb-1">Errors:</div>
			<div class="flex gap-2">
				{#each Array.from(Array(errors)) as _, i}
					<div class="w-6 h-6 bg-red-400" />
				{/each}
			</div>
		{/if}
	{:else}
		<div class="text-7xl text-red-400 m-auto">You lost!</div>
	{/if}
{:else}
	<div class="flex flex-col text-7xl text-green-400 m-auto overflow-visible">
		<div>You win!</div>
		<div class="m-auto overflow-visible">
			<Confetti x={[-0.5, 0.5]} amount="100" />
		</div>
	</div>
{/if}
<MobileKeyboard
	cls="mt-auto mx-auto"
	onClick={(l) => {
		const newWl = wordList.map((w) => {
			if (w.letter === l) {
				return {
					...w,
					visible: true
				};
			}
			return w;
		});
		const newError = newWl.every((w) => w.letter !== l);
		onChange({ wordList: newWl, error: newError });
	}}
/>
