<script>
	/**
	 * @type {string}
	 */
	export let description;
	export let cls = '';
</script>

{#if description !== undefined}
	<div class={`${cls} flex`}>
		<p class=" overflow-y-auto">
			{description}
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
