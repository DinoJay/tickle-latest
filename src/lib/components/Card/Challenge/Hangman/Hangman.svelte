<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { addDoc, collection, updateDoc } from 'firebase/firestore';
	import { onDestroy, onMount } from 'svelte';
	import MobileKeyboard from './MobileKeyboard.svelte';

	export let hint;
	/**
	 * @type {any[]}
	 */
	export let wordList;
	/**
	 * @type {(arg0: any[]) => void}
	 */
	export let onChange;
</script>

<div class="text-xl flex gap-2">
	{#each wordList as l}
		{#if l.visible}
			<div>{l.letter}</div>
		{:else}
			<div>_</div>
		{/if}
	{/each}
</div>

<MobileKeyboard
	cls="mt-auto mx-auto"
	onClick={(l) => {
		onChange(
			wordList.map((w) => {
				if (w.letter === l) {
					return {
						...w,
						visible: true
					};
				}
				return w;
			})
		);
	}}
/>
