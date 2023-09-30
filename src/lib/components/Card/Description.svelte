<script>
	import { EN, FR, NL } from '$lib/constants/locales';
	import { locale } from 'svelte-i18n';
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
</script>

{#if !!description_en || !!description_fr || !!description_nl}
	<div class={`${cls} flex`}>
		<p class=" overflow-y-auto">
			{#if $locale === EN}
				{description_en}
			{:else if $locale === FR}
				{description_fr}
			{:else if $locale === NL}
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
