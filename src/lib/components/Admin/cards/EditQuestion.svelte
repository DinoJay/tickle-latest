<script>
	import Check from 'svelte-material-icons/CheckCircleOutline.svelte';
	import AlphaX from 'svelte-material-icons/CloseOctagonOutline.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import UploadFile from '../utils/edit/UploadFile.svelte';
	export let q;
	export let onChange;
	export let onCreate;
	export let onClose;
	export let onRemove;
	export let open;

	$: textQ = q ? q.text : null;
	$: console.log('q', q);
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
		<div class="flex-grow flex flex-col ">
			<h2 class="form-text">Answers:</h2>
			<ul class="mb-2">
				{#each answers as a}
					<li class="flex">
						<input
							value={a.text}
							on:change={(a) => {
								const nq = editAnswer(a, { text: a.target.value.trim() });
								onChange(nq);
							}}
						/>
						<button
							class="ml-auto"
							on:click={() => {
								const nq = editAnswer(a, { correct: !a.correct });
								onChange(nq);
								nw = '';
							}}
						>
							{#if a.correct}
								<Check size={30} />
							{:else}
								<AlphaX size={30} color="red" />
							{/if}
						</button>
					</li>
				{/each}
			</ul>
			<div class="flex">
				<input class="border-2 p-1 w-full" bind:value={nw} placeholder="Please add Answer" />
				<button
					class="create-btn"
					on:click={() => {
						onChange({ ...q, answers: [...q.answers, { text: nw, correct: false }] });
						nw = '';
					}}>Add</button
				>
			</div>
		</div>
		{#if onCreate}
			<button class="create-btn mt-3" on:click={onCreate}>Add new Question</button>
		{/if}
		{#if onRemove}
			<button class="del-btn mt-3" on:click={() => onRemove(q.id)}>Remove Question</button>
		{/if}
	</div>
</LightBox>
