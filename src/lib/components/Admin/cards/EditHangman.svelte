<script>
	import { updateCurrentUser } from 'firebase/auth';
	import { afterUpdate } from 'svelte';

	const WORD = 'example';
	const HINT = null;
	export let value = { word: WORD, hint: HINT };
	/**
	 * @type {(arg0: { word: string; hint: string; }) => void}
	 */
	export let onChange;

	/**
	 * @type {number | null | undefined}
	 */
	let selIndex = null;

	$: word = value.word || WORD;
	$: hint = value.hint || HINT;

	function useInit(node, selIndex) {
		node.focus();
		node.select();

		// the node has been mounted in the DOM
		return {
			update() {
				// if (selIndex === i) {
				// 	node.focus();
				// 	node.select();
				// }
				node.focus();
				node.select();
			},
			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div class="mb-3 ">
	<div class="label text-2xl">Hint:</div>
	<textarea value={hint} placeholder="Please enter your hint" class="input-text w-full" />
</div>
<div class="mb-3 text-2xl">
	<div class="label mb-2">Word:</div>

	<div class="flex flex-wrap gap-2">
		{#each [...word] as letter, i}
			<div class="border-2  border-gray-600  letter-cont">
				<!-- <span class="visually-hidden ">empty</span> -->
				<input
					use:useInit
					name="guess"
					on:focus={(e) => {
						console.log('focus', e.target);
						if (word.length <= 1) return;
						e.target.select();
						selIndex = i;
					}}
					on:click={(e) => {
						e.target.select();
					}}
					on:input={(e) => {}}
					on:change={(e) => {
						if (word.length < 1 || e.target.value === '' || e.target.value === ' ') return;
						e.target.select();
						onChange({
							hint: hint || HINT,
							word: (word.slice(0, i) + e.target?.value + word.slice(i + 1)).trim()
						});
					}}
					on:keydown={(e) => {
						if (word.length <= 1) return;

						const elems = [...document.querySelectorAll('.letter')];
						if (e.key === 'Backspace') {
							e.preventDefault();
							onChange({
								hint: hint || HINT,
								word: word.slice(0, i) + word.slice(i + 1)
							});

							elems[word.length - 2].focus();
							selIndex = selIndex - 1;
							// ?.focus();
						} else {
							// const elems = [...document.querySelectorAll('.letter')];
							const index = (i + 1) % word.length;
							// console.log('elems', elems);
							// elems[index]?.focus();
							// setTimeout(() => {
							// 	elems[index]?.select();
							// }, 200);
						}
						// e.target.select();
					}}
					maxlength="1"
					type="text"
					class="letter w-full h-full"
					value={letter}
				/>
			</div>
		{/each}
	</div>
</div>
<div class="mt-auto flex">
	<button
		disabled={selIndex === null}
		class="del-btn flex-grow {selIndex === null ? 'disabled' : ''}"
		style="max-width:50%"
		on:click={() => {
			if (!selIndex || word.length <= 1) return;
			console.log('selIndex', selIndex);
			onChange({
				hint: hint || HINT,
				word: word.slice(0, selIndex) + word.slice(selIndex + 1)
			});
			selIndex = null;

			const elems = [...document.querySelectorAll('.letter')];
			// selIndex = (i - 1) % word.length;

			elems[word.length - 2].focus();
		}}>Remove letter</button
	>
	<button
		class="create-btn flex-grow"
		on:click={() => {
			onChange({
				hint: hint || HINT,
				word: word + 'a'
			});

			// const elems = [...document.querySelectorAll('.letter')];
			// elems[elems.length - 1]?.focus();
			// console.log('elems', elems);
		}}>Add letter</button
	>
</div>

<style>
	.letter-cont {
		width: 56px;
		height: 56px;
	}
	.letter {
		--width: min(100vw, 40vh, 380px);
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: lowercase;
		/* border: none; */
		font-size: calc(0.08 * var(--width));
		/* border-radius: 2px; */
		background: white;
		/* margin: 0; */
		/* color: rgba(0, 0, 0, 0.7); */
	}
</style>
