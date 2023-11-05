<script>
	export let onClick = () => {};
	export let wrongLetters = [];
	export let rightLetters = [];
	export let style = '';
	export let cls = '';
	export let disabled = false;
</script>

<div class={cls} style="width:min(100vw, 40vh, 350px)">
	<div class="grid" {style}>
		{#each ['0123456789', 'abcdefghij', 'klmnopqrst', 'uvwxyz'] as row}
			<div class="row">
				{#each row as letter}
					<button
						on:click={() => {
							if (!disabled) onClick(letter);
						}}
						data-key={letter}
						class="letter bg-gray-200"
						disabled={false}
						name="key"
						value={letter}
						aria-label={letter}
					>
						{letter}
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.grid {
		--width: min(100vw, 40vh, 380px);
		max-width: var(--width);
		align-self: center;
		justify-self: center;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.grid .row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 0.2rem;
		margin: 0 0 0.2rem 0;
	}
	.letter {
		/* aspect-ratio: 1; */
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: lowercase;
		border: none;
		font-size: calc(0.08 * var(--width));
		border-radius: 2px;
		/* background: white; */
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
	}
	.controls {
		/* text-align: center;
		justify-content: center;
		height: min(18vh, 10rem); */
	}
</style>
