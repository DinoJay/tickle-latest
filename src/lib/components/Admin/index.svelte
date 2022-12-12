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
	import { store, loadCardEnvironments, setEnvs } from '/src/stores/index';
	import { getAllContexts } from 'svelte';
	import Logo from '../navigationBar/Logo.svelte';

	import { LOG_ACTIVITY_SUBTYPE } from './UserActivities/logTypes';

	//	import { updateCurrentUser } from 'firebase/auth';
	//uploads images : https://svelte.dev/repl/b17c13d4f1bb40799ccf09e0841ddd90?version=3.49.0

	/**
	 * selectedEnvironment - The current environment selected in the admin page
	 * selectedCard - The current card selected from an envrionment
	 */
	// toxin default environment change later
	loadCardEnvironments();
	let selectedEnvId = 'bnW56f62WWEJ0bwJwQ0m';
	$: envs = $store.envs;
	const changeSelectedEnv = (/** @type {string} */ id) => {
		selectedEnvId = id;
	};
	$: selectedEnv = envs.find((d) => d.id === selectedEnvId);
	$: console.log('envs', envs);
	let cards;

	let selectedCardId = null;

	$: {
		getDocs(collection(db, 'card-envs', selectedEnvId, 'cards')).then((snapRef) => {
			const prs = snapRef.docs.map((doc) => {
				const d = doc.data();
				return getDocs(
					collection(db, 'card-envs', selectedEnvId, 'cards', d.id, 'activitySubmissions')
				).then((snapRef) => ({ ...d, activitySubmissions: snapRef.docs.map((d) => d.data()) }));
			});
			Promise.all(prs).then((cs) => (cards = cs));
		});
	}
	const setCards = (cs) => {
		console.log('setCards', cards);

		cards = cs;
	};

	let userLogs = null;
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
				<Environments
					{envs}
					{selectedEnv}
					onSelectEnv={(id) => (selectedEnvId = id)}
					onChange={(envs) => setEnvs(envs)}
				/>
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
				<Map {cards} {selectedEnvId} onChange={setCards} />
			</Panel>
		</div>
		<div>
			<Panel title={`User Activities`}>
				<UserActivities
					{cards}
					{userLogs}
					{selectedEnvId}
					onChange={setCards}
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
