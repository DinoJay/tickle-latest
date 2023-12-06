<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, updateDoc } from 'firebase/firestore';

	export let envs;
	/**
	 * @type {any[]}
	 */
	export let envIds;
	/**
	 * @type {(arg0: any[]) => void}
	 */
	export let onEnvIdsChange;
	/**
	 * @type {string}
	 */
	export let uid;

	let searchListDisabled = false;

	let filterTxt = '';

	$: tmpEnvs = envs.filter((e) => {
		if (filterTxt === '') return true;
		return e.title.toLowerCase().includes(filterTxt.toLowerCase());
	});

	// $: {
	// 	clearTimeout(timeout.id);
	// 	setTimeout(() => {
	// 		tmpEnvIds = envIds;
	// 	}, 1000);
	// }
</script>

<input class="input-text mb-1" placeholder="Search Env" bind:value={filterTxt} />
{#if tmpEnvs.length === 0}
	<div class="h-48 flex">
		<div class="placeholder m-auto">No Env found</div>
	</div>
{:else}
	<ul class="h-48 overflow-y-auto">
		{#each tmpEnvs as en}
			<li class="flex">
				<div>{en.title || en.id}</div>
				<input
					class="ml-auto"
					type="checkbox"
					checked={envIds.includes(en.id)}
					disabled={searchListDisabled}
					on:change={(e) => {
						console.log('en', en.id);
						if (e.target.checked) {
							const ids = [...envIds, en.id];
							onEnvIdsChange(ids);
						} else {
							const ids = envIds.filter((id) => id !== en.id);
							onEnvIdsChange(ids);
						}

						// searchListDisabled = true;
					}}
				/>
			</li>
		{/each}
	</ul>
{/if}
