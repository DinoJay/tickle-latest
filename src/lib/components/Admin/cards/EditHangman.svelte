<script>
	import { select } from 'd3';
	const WORD = 'hello';
	const HINT = 'world';
	export let value = { word: WORD, hint: HINT };
	/**
	 * @type {(arg0: { word: string; hint: string; }) => void}
	 */
	export let onChange;

	/**
	 * @type {number | null | undefined}
	 */
	let selIndex = null;
	$: console.log('selIndex', selIndex);

	$: word = value.word || WORD;
	$: hint = value.hint || HINT;
</script>

<div class="mb-3 text-2xl">
	<div class="label">Hint:</div>
	<textarea class="input-text w-full" />
</div>
<div class="mb-3 text-2xl">
	<div class="label mb-2">Word:</div>

	<div class="flex flex-wrap gap-2">
		{#each [...word] as letter, i}
			<div class="border-2  border-gray-600  letter-cont">
				<!-- <span class="visually-hidden ">empty</span> -->
				<input
					name="guess"
					on:focus={(e) => {
						console.log('e', e.target);
						selIndex = i;
					}}
					on:change={(e) => {
						e.target.select();
						onChange({
							hint: hint || HINT,
							word: (word.slice(0, i) + e.target?.value + word.slice(i + 1)).trim()
						});
					}}
					on:keydown={(e) => {
						if (e.key === 'Backspace') {
							e.preventDefault();
							onChange({
								hint: hint || HINT,
								word: word.slice(0, i) + word.slice(i + 1)
							});
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
	<div class="mt-3 flex">
		<button
			disabled={selIndex === null}
			class="del-btn flex-grow {selIndex === null ? 'disabled' : ''}"
			style="max-width:50%"
			on:click={() => {
				if (!selIndex) return;
				console.log('selIndex', selIndex);
				onChange({
					hint: hint || HINT,
					word: word.slice(0, selIndex) + word.slice(selIndex + 1)
				});
				selIndex = null;
			}}>Remove letter</button
		>
		<button
			class="create-btn flex-grow"
			on:click={() => {
				onChange({
					hint: hint || HINT,
					word: word + 'a'
				});
			}}>Add letter</button
		>
	</div>
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
