<script>
	import { select } from 'd3';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';

	// export let selectedEnvId;

	import TickleWobble from '../utils/TickleWobble.svelte';
	import SelectEnvCont from './SelectEnvCont.svelte';

	import { store } from '/src/stores/index';

	$: console.log('currentUser', $store.currentUser);

	$: promise = getDocs(collection(db, 'card-envs')).then((sn) => {
		return sn.docs
			.map((doc) => doc.data())
			.filter((d) => $store.currentUser?.envIds?.includes(d.id));
	});
</script>

{#await promise}
	<TickleWobble />
{:then envs}
	<SelectEnvCont {...$$props} {envs} />
{/await}
