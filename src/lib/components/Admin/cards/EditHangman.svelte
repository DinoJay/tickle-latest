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
	export let onClose;

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
	$: disabledRemoveBtn = word.length < 2;

	$: console.log('disabledRemoveBtn', disabledRemoveBtn);
</script>

<div class="mb-3 ">
	<div class="label text-2xl">Hint:</div>
	<textarea
		value={hint}
		on:change={(e) => {
			onChange({
				hint: e.target.value,
				word: word
			});
		}}
		placeholder="Please enter your hint"
		class="input-text w-full h-24"
	/>
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
					on:click={(e) => {
						e.target.select();
						selIndex = i;
					}}
					on:focus={() => {
						selIndex = i;
					}}
					on:input={(e) => {
						if (word.length < 1 || e.target.value === '' || e.target.value === ' ') return;
						e.target.select();

						onChange({
							hint: hint || HINT,
							word: word.slice(0, i) + e.target?.value + word.slice(i + 1).trim()
						});

						const elems = [...document.querySelectorAll('.letter')];
						const index = (i + 1 < word.length ? i + 1 : i) % word.length;
						// // console.log('elems', elems);
						// elems[index]?.focus();
						// elems[index]?.select();
						selIndex = index;
						// setTimeout(() => {
						elems[index]?.select();
						elems[index]?.focus();
						// });
					}}
					on:keydown={(e) => {
						// return;
						if (word.length <= 1) return;

						const elems = [...document.querySelectorAll('.letter')];
						if (e.key === 'Backspace') {
							e.preventDefault();
							onChange({
								hint: hint || HINT,
								word: word.slice(0, i) + word.slice(i + 1)
							});

							elems[word.length - 2].focus();
							selIndex = selIndex || 0 - 1;
							return;
							// ?.focus();
						}
						if (e.key === 'ArrowLeft') {
							e.preventDefault();
							elems[i - 1 < 0 ? elems.length - 1 : i - 1]?.focus();
							selIndex = selIndex || 0 - 1;
							return;
						}
						if (e.key === 'ArrowRight') {
							e.preventDefault();
							elems[(i + 1) % elems.length]?.focus();
							selIndex = selIndex || 0 + 1;
							return;
						}
						if (e.key === 'ArrowUp') {
							e.preventDefault();
							elems[i - 5 < 0 ? elems.length - 1 : i - 5]?.focus();
							selIndex = selIndex || 0 - 5;
							return;
						}

						if (e.key === 'ArrowDown') {
							e.preventDefault();
							elems[(i + 5) % elems.length]?.focus();
							selIndex = selIndex || 0 + 5;
							return;
						}

						if (e.key === 'Enter') {
							e.preventDefault();
							elems[(i + 1) % elems.length]?.focus();
							selIndex = selIndex || 0 + 1;
							return;
						}

						// const elems = [...document.querySelectorAll('.letter')];
						// onChange({
						// 	hint: hint || HINT,
						// 	word: word.slice(0, i) + 'a' + word.slice(i + 1)
						// });
						// e.target.select();
					}}
					on:focusout={(e) => {
						console.log('blur', e.target);
						// setTimeout(() => {
						// 	selIndex = null;
						// }, 100);
					}}
					maxlength="1"
					class="letter w-full h-full"
					value={letter}
				/>
			</div>
		{/each}
	</div>
</div>
<div class="mt-auto flex">
	<button
		class="del-btn flex-grow {disabledRemoveBtn ? 'disabled pointer-events-none' : ''}"
		style="max-width:50%"
		on:click={(e) => {
			e.preventDefault();
			e.stopPropagation();
			console.log('selIndex', selIndex);
			onChange({
				hint: hint || HINT,
				word: word.slice(0, word.length - 1) + word.slice(word.length)
			});
			selIndex = null;

			const elems = [...document.querySelectorAll('.letter')];
			// selIndex = (i - 1) % word.length;

			elems[word.length - 2].focus();

			const index = (i - 1) % word.length;
			// // console.log('elems', elems);
			// elems[index]?.focus();
			// elems[index]?.select();
			selIndex = index;
			// setTimeout(() => {
			elems[index]?.select();
		}}>Remove last letter</button
	>
	<button
		class="btn flex-grow"
		on:click={() => {
			onChange({
				hint,
				word: `${word}a`
			});

			setTimeout(() => (selIndex = word.length), 400);
			console.log('word', word);
			const elems = [...document.querySelectorAll('.letter')];
			elems[elems.length - 1]?.focus();
			// console.log('elems', elems);
		}}>Add letter</button
	>
</div>
<button
	class="w-full create-btn mt-3"
	on:click={() => {
		onClose();

		onChange({
			hint: hint || HINT,
			word: word.slice(0, selIndex) + word.slice(selIndex + 1)
		});
	}}
>
	Save & Close
</button>

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
