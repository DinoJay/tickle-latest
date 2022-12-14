<script>
	import EditEnv from './EditEnv.svelte';

	let env = { title: '', description: '', img: {} };
	/**
	 * @type {(arg0: { title: string; description: string; img: {}; }) => void}
	 */
	export let onCreate;
	/**
	 * @type {string}
	 */
</script>

<EditEnv {...$$props} {env} onChange={(e) => (env = e)} onCreate={() => onCreate(env)} />
