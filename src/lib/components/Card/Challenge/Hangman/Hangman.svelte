<script>
	import Notification from '$lib/components/Notifications/Notification.svelte';
	import { langDict } from '../../../../../stores/localizationStore';
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

	$: console.log('errors', errors);
</script>

<p class="text-lg">{hint || ''}</p>

{#if errors >= 5}
	<Notification>{$langDict.hangman.you_failed}</Notification>
{/if}
{#if !succeeded}
	<div class="text-7xl flex flex-wrap gap-4 m-auto text-gray-600 h-64 items-center overflow-y-auto">
		{#each wordList as l}
			{#if l.visible}
				<div>{l.letter}</div>
			{:else}
				<div>_</div>
			{/if}
		{/each}
	</div>
	<div class="mb-1 label text-xl">{$langDict.hangman.errors}:</div>
	<div class="flex gap-2 mb-3 text-lg">
		{#if errors === 0}
			{$langDict.hangman.no_errors}
		{/if}
		{#each Array.from(Array(errors)) as _, i}
			<div class="w-6 h-6 bg-red-400" />
		{/each}
	</div>
{:else}
	<Notification type="success" close={() => (succeeded = null)}
		>{$langDict.hangman.you_won}</Notification
	>
	<div class="m-auto overflow-visible">
		<Confetti x={[-0.5, 0.5]} amount={100} />
	</div>
{/if}
<MobileKeyboard
	cls="mt-auto mx-auto"
	disabled={errors >= 5 || succeeded}
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
