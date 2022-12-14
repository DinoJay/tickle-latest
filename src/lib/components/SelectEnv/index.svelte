<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';

	// export let selectedEnvId;

	import TickleWobble from '../utils/TickleWobble.svelte';
	import SelectEnvCont from './SelectEnvCont.svelte';

	$: promise = getDocs(collection(db, 'card-envs')).then((sn) => {
		// console.log(
		// 	'sn doc',
		// 	sn.docs.map((doc) => doc.data())
		// );
		return sn.docs.map((doc) => doc.data());
	});
</script>

{#await promise}
	<TickleWobble />
{:then envs}
	<SelectEnvCont {...$$props} {envs} />
{/await}
