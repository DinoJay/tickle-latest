<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import LightBox from '../../utils/LightBox.svelte';
	import { doc, deleteDoc, setDoc } from 'firebase/firestore';
	import EditEnvironment from './EditEnv.svelte';
	import CreateEnv from './CreateEnv.svelte';

	import { v4 as uuidv4 } from 'uuid';
	import { titleLocales } from '$lib/constants/locales';
	export let toxinId = 'bnW56f62WWEJ0bwJwQ0m';

	/**
	 * @type {any[]}
	 */
	export let envs;
	/**
	 * @type {import("@firebase/firestore").Firestore}
	 */
	/**
	 * @type {any | null}
	 */
	export let selectedEnv = null;
	/**
	 * @type {(arg0: any) => void}
	 */
	export let onChange;
	/**
	 * @type {(arg0: any) => void}
	 */
	export let onSelectEnv;

	export let selLang;

	// /**
	//  * @type {string}
	//  */
	// export let selLang;

	let lbOpen = false;
	let nlbOpen = false;

	const onEnvClick = (/** @type {{ id: string; }} */ env) => {
		if (selectedEnv?.id !== env?.id) {
			onSelectEnv(env.id);
			return;
		}
		if (selectedEnv?.id === env.id) lbOpen = true;
	};
</script>

<div class="overflow-auto flex flex-col overflow-y-auto">
	{#each envs as env}
		<div class="flex mb-2">
			<button
				on:click={() => onEnvClick(env)}
				class="p-1 flex-grow border-2"
				class:sel-small-btn={selectedEnv?.id === env.id}
			>
				<!-- <span> 🕯</span> -->
				<span>
					{env[titleLocales[selLang]] || env.title || 'no-title'}
				</span>
			</button>

			<!-- {#if selectedEnv?.id === env.id}
				<div class="my-auto">
					{#if env.title !== 'TOXIN'}
						<button
							on:click={() => {
								deleteDoc(doc(db, 'card-envs', env.id));
								onChange(envs.filter((e) => e.id !== env.id));
							}}
							class="border-2 py-1 px-2 text-lg text-white bg-red-300 border-red-300">-</button
						>
					{/if}
				</div>
			{/if} -->
		</div>
	{/each}
	<button class="create-btn mt-auto" on:click={() => (nlbOpen = true)}>Create Env</button>
</div>

<LightBox
	title={selectedEnv[titleLocales[selLang]] || selectedEnv?.title || 'Edit Environment'}
	isOpen={lbOpen}
	fixedWidth={true}
	close={() => (lbOpen = false)}
>
	<EditEnvironment
		env={selectedEnv}
		onClose={() => (lbOpen = false)}
		onChange={(/** @type {any} */ newEnv) => {
			const docRef = doc(db, 'card-envs', newEnv.id);
			setDoc(docRef, newEnv).catch((error) => {
				console.log(error);
			});

			const newEnvs = envs.map((e) => {
				if (e.id === selectedEnv?.id) {
					return newEnv;
				}
				return e;
			});
			onChange(newEnvs);
		}}
		onRemove={selectedEnv?.id !== toxinId
			? () => {
					lbOpen = false;
					const newEnvs = envs.filter((e) => e.id !== selectedEnv.id);
					const oldEnvIndex = envs.findIndex((e) => e.id === selectedEnv.id);
					const newIndex = oldEnvIndex % newEnvs.length;
					onChange(newEnvs);
					deleteDoc(doc(db, 'card-envs', selectedEnv.id));
					onSelectEnv(newEnvs[newIndex].id);
			  }
			: undefined}
	/>
</LightBox>

<LightBox title={'New Environment'} isOpen={nlbOpen} close={() => (nlbOpen = false)}>
	<CreateEnv
		onCreate={(env) => {
			const id = uuidv4();
			setDoc(doc(db, 'card-envs', id), { ...env, id }).catch((error) => {
				console.log(error);
			});
			onChange([...envs, { ...env, id }]);
			nlbOpen = false;
		}}
	/>
</LightBox>
