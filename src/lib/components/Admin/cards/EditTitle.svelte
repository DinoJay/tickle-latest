<script>
	/**
	 * @type {(arg0: { [x: string]: any; }) => any}
	 */
	export let onChange;
	/**
	 * @type {any}
	 */
	export let onClose;

	/**
	 * @type {string}
	 */
	export let title;
</script>

<input
	placeholder="Enter your title"
	value={title || ''}
	class="border-2 p-2 w-full"
	on:input={(e) => onChange(e.target.value)}
/>
