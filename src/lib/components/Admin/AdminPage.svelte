<script>
	import { db } from '$lib/firebaseConfig/firebase';

	import { collection, doc, getDocs } from 'firebase/firestore';
	import Panel from '$lib/components/Admin/Panel.svelte';
	import Environments from '$lib/components/Admin/environments/Environments.svelte';
	import Topics from '$lib/components/Admin/Topics/index.svelte';
	import Cards from '$lib/components/Admin/cards/index.svelte';
	import Map from '$lib/components/Admin/Map/index.svelte';
	import GeoCatchingValidation from '$lib/components/Admin/geoCaching/GeoCachingValidation.svelte';
	import UserActivities from './UserActivities/index.svelte';
	// @ts-ignore
	import { store } from '/src/stores/index';
	import { getAllContexts } from 'svelte';

	import { LOG_ACTIVITY_SUBTYPE } from './UserActivities/logTypes';
	import { LANGS } from '$lib/constants/locales';

	/**
	 * @type {any[]}
	 */
	export let envs;
	/**
	 * @type {any[]}
	 */
	export let cards;
	/**
	 * @type {any}
	 */
	export let topics;
	/**
	 * @type {string}
	 */
	export let selectedEnvId;
	/**
	 * @type {(arg0: any[]) => void}
	 */
	export let onEnvsChange;
	/**
	 * @type {(arg0: any[]) => void}
	 */
	export let onCardsChange;
	/**
	 * @type {(arg0: any) => void}
	 */
	export let onSelectEnv;
	/**
	 * @type {(arg0: any[]) => void}
	 */
	export let onTopicsChange;

	$: console.log('selectedEnvId', selectedEnvId);
	$: selectedEnv = envs.find((d) => d.id === selectedEnvId);
	$: console.log({ envs });
	$: console.log({ selectedEnv });

	let selectedCardId = null;
	/**
	 * @type {any[] | null}
	 */
	let userLogs = null;

	$: userLogs = !!cards
		? cards
				.flatMap((d) => d.activitySubmissions)
				.map((d) => ({ ...d, logType: LOG_ACTIVITY_SUBTYPE }))
		: null;

	let selLang = selectedEnv?.langs !== undefined ? selectedEnv.langs[0] : LANGS[0];

	$: langs = selectedEnv?.langs !== undefined ? selectedEnv.langs : LANGS;

	console.log({ langs });

	// $: console.log({ selectedEnv });
</script>

<!-- {#if $store?.currentUser?.admin} -->
<div class="grid grid-cols-1 gap-3 m-2">
	<Panel title={selectedEnv.title}>
		<Environments {envs} {selectedEnv} {onSelectEnv} onChange={onEnvsChange} />
		<div slot="header" class="flex gap-1">
			{#each langs as l}
				<button
					class="small-btn"
					class:sel-small-btn={selLang === l}
					on:click={(e) => {
						e.stopPropagation();
						selLang = l;
					}}>{l}</button
				>
			{/each}
		</div>
	</Panel>

	<div>
		<Panel title={'Topics'}>
			<Topics
				{selectedEnvId}
				{topics}
				onChange={onTopicsChange}
				langs={selectedEnv.langs}
				{selLang}
				onSelLangChange={(/** @type {string} */ l) => (selLang = l)}
			/>
		</Panel>
	</div>

	<div>
		<Panel title={'Cards'}>
			<Cards
				{cards}
				{selectedEnvId}
				onChange={onCardsChange}
				langs={selectedEnv.langs}
				{selLang}
				onSelLangChange={(/** @type {string} */ l) => (selLang = l)}
			/>
		</Panel>
	</div>

	<div>
		<Panel title={`Map`} height={'40rem'}>
			<Map {cards} {selectedEnvId} onChange={onCardsChange} {selLang} />
		</Panel>
	</div>
	<div>
		<Panel title={`User Activities`}>
			<UserActivities
				{cards}
				{userLogs}
				{selectedEnvId}
				onDelete={(logId) => {
					userLogs = userLogs.filter((d) => d.id !== logId);
				}}
			/>
		</Panel>
	</div>
</div>
<!-- {/if} -->
{#if !$store?.currentUser?.admin === null}
	<div class="absolute top-[50%] left-[calc(50%-8rem)] h-12 w-64 text-center">
		You do not have the permission to acces this page.
	</div>
{/if}

{#if $store?.currentUser?.admin === undefined}
	<div class="absolute top-[50%] left-[calc(50%-8rem)] h-12 w-64 text-center">Loading...</div>
{/if}
