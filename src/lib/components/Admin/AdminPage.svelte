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

	export let envs;
	export let cards;
	export let selectedEnvId;
	export let onEnvsChange;
	export let onCardsChange;
	export let onSelectEnv;

	$: selectedEnv = envs.find((d) => d.id === selectedEnvId);
	$: console.log('envs', envs);

	let selectedCardId = null;
	let userLogs = null;

	const setCards = (cs) => {
		cards = cs;
	};

	$: userLogs = !!cards
		? cards
				.flatMap((d) => d.activitySubmissions)
				.map((d) => ({ ...d, logType: LOG_ACTIVITY_SUBTYPE }))
		: null;
</script>

{#if $store?.currentUser?.admin}
	<div class="grid grid-cols-1 gap-3 m-2 ">
		<div>
			<Panel title="Environments">
				<Environments {envs} {selectedEnv} {onSelectEnv} onChange={onEnvsChange} />
			</Panel>
		</div>

		<div>
			<Panel title={'Topics'}>
				<Topics {selectedEnvId} />
			</Panel>
		</div>

		<div>
			<Panel title={'Cards'}>
				<Cards {cards} {selectedEnvId} onChange={setCards} />
			</Panel>
		</div>

		<div>
			<Panel title={`Map`} height={'40rem'}>
				<Map {cards} {selectedEnvId} onChange={onCardsChange} />
			</Panel>
		</div>
		<div>
			<Panel title={`User Activities`}>
				<UserActivities
					{cards}
					{userLogs}
					{selectedEnvId}
					onChange={onCardsChange}
					onDelete={(logId) => {
						userLogs = userLogs.filter((d) => d.id !== logId);
					}}
				/>
			</Panel>
		</div>
	</div>
{/if}
{#if !$store?.currentUser?.admin === null}
	<div class="absolute top-[50%] left-[calc(50%-8rem)] h-12 w-64 text-center">
		You do not have the permission to acces this page.
	</div>
{/if}

{#if $store?.currentUser?.admin === undefined}
	<div class="absolute top-[50%] left-[calc(50%-8rem)] h-12 w-64 text-center">Loading...</div>
{/if}
