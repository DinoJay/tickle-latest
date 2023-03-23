<script>
	export let value = null;
	export let cls = '';
</script>

{#if !!value}
	<p class=" overflow-y-auto {cls}">
		{value}
	</p>
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

				<div class="ph-col-6 " />
				<div class="ph-col-4 empty " />
				<div class="ph-col-8" />
				<div class="ph-col-12" />
				<div class="ph-col-10" />
				<div class="ph-col-12" />
			</div>
		</div>
	</div>
{/if}
