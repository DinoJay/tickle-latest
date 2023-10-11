<script>
	import Check from 'svelte-material-icons/CheckCircleOutline.svelte';
	import AlphaX from 'svelte-material-icons/CloseOctagonOutline.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import UploadFile from '$lib/components/utils/UploadFile.svelte';
	import WindowClose from 'svelte-material-icons/WindowClose.svelte';

	export let q;
	export let onChange;
	export let onCreate;
	export let onClose;
	export let onRemove;
	export let open;

	$: textQ = q ? q.text : null;
	$: answers = q ? q.answers : [];
	let nw = '';
	$: console.log('q', q);

	$: editAnswer = (a, o) => {
		return {
			...q,
			answers: q.answers.map((b) => {
				if (a.text === b.text) return { ...a, ...o };
				return b;
			})
		};
	};

	$: createDisabled =
		answers.length === 0 || textQ.trim().length === 0 || answers.every((a) => !a.correct);

	$: addAnswerDisabled = nw.trim().length === 0 || answers.find((a) => a.text === nw);
</script>

<LightBox title={textQ} isOpen={open} close={onClose}>
	<div class="flex flex-col flex-grow overflow-y-auto">
		<div class="mb-3">
			<UploadFile
				url={q.img?.url}
				onChange={(url, name) => {
					console.log('urlURL', url, 'fname', name);
					onChange({ ...q, img: { url, name } });
				}}
			/>
		</div>
		<div>
			<h2 class="text-gray-500 form-text">Question:</h2>
			<textarea
				class="border-2 p-2 w-full"
				placeholder="please add question!"
				rows="4"
				value={textQ}
				on:change={(e) => onChange({ ...q, text: e.target.value })}
			/>
		</div>
		<div class="flex-grow flex flex-col">
			<h2 class="form-text">Answers:</h2>
			<ul class="mb-2">
				{#each answers as a}
					<li class="flex mb-1">
						<input
							class="border-2 p-1 flex-grow"
							value={a.text}
							on:change={(e) => {
								const nq = editAnswer(a, { text: e.target.value.trim() });
								onChange(nq);
							}}
						/>
						<button
							class="ml-2"
							style="width:2rem"
							on:click={() => {
								const nq = editAnswer(a, { correct: !a.correct });
								onChange(nq);
								nw = '';
							}}
						>
							{#if a.correct}
								<div class="text-green-500 font-bold border-2 border-green-500">T</div>
							{:else}
								<div class="text-red-500 border-2 border-red-500 font-bold">F</div>
							{/if}
						</button>
						<button
							class="ml-3"
							on:click={() => {
								const answers = q.answers.filter((b) => b.text !== a.text);
								onChange({ ...q, answers });
								nw = '';
							}}
						>
							<WindowClose />
						</button>
					</li>
				{/each}
			</ul>
			<div class="flex mt-1">
				<input class="border-2 p-1 w-full" bind:value={nw} placeholder="Please add Answer" />
				<button
					class="create-btn ml-2"
					disabled={addAnswerDisabled}
					class:disabled={addAnswerDisabled}
					on:click={() => {
						onChange({ ...q, answers: [...q.answers, { text: nw, correct: false }] });
						nw = '';
					}}>Add</button
				>
			</div>
		</div>
		{#if onCreate}
			<button
				class="create-btn mt-3"
				class:disabled={createDisabled}
				disabled={createDisabled}
				on:click={onCreate}>Add Question</button
			>
		{/if}
		{#if onRemove}
			<button class="del-btn mt-3" on:click={() => onRemove(q.id)}>Remove Question</button>
		{/if}
	</div>
</LightBox>
