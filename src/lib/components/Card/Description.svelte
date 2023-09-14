<script>
	/**
	 * @type {string}
	 */
	export let description_en;
	/**
	 * @type {string}
	 */
	export let description_fr;
	/**
	 * @type {string}
	 */
	export let description_nl;
	export let cls = '';
	/**
	 * @type {string}
	 */
	export let NL;
	/**
	 * @type {string}
	 */
	export let FR;
	/**
	 * @type {string}
	 */
	export let EN;
	/**
	 * @type {string}
	 */
	export let selLang;
</script>

{#if !!description_en || !!description_fr || !!description_nl}
	<div class={`${cls} flex`}>
		<p class=" overflow-y-auto">
			{#if selLang === EN}
				{description_en}
			{:else if selLang === FR}
				{description_fr}
			{:else if selLang === NL}
				{description_nl}
			{/if}
		</p>
	</div>
{:else}
	<div class="{cls} overflow-y-auto">
		<div class="">
			<div class="ph-row">
				<div class="ph-col-4" />
				<div class="ph-col-8 empty" />
				<div class="ph-col-6" />
				<div class="ph-col-6 empty" />
				<div class="ph-col-12" />
				<div class="ph-col-6" />
				<!-- <div class="ph-col-6 empty" /> -->
				<div class="ph-col-12" />
				<!-- <div class="ph-col-8 empty" /> -->
				<div class="ph-col-8" />
				<div class="ph-col-12" />
				<div class="ph-col-10" />
				<div class="ph-col-12" />

				<div class="ph-col-6" />
				<div class="ph-col-4 empty" />
				<div class="ph-col-8" />
				<div class="ph-col-12" />
				<div class="ph-col-10" />
				<div class="ph-col-12" />
			</div>
		</div>
	</div>
{/if}
