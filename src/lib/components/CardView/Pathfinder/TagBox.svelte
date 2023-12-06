<script>
	export let width;
	export let height;
	export let x;
	export let y;
	export let topics;
</script>

{#if topics.length === 1}
	<div
		class="absolute"
		style:width="{width}px"
		style:height="{height}px"
		style:left="{x - width / 2}px"
		style:top="{y - height / 2}px"
		style:background={topics[0].color}
	/>
{/if}
{#if topics.length === 2}
	<div
		class="absolute"
		style:width="{width}px"
		style:height="{height}px"
		style:left="{x - width / 2}px"
		style:top="{y - height / 2}px"
		style:background="linear-gradient(to bottom left, {topics[0].color} 50%, {topics[1].color} 50%)"
	/>
{/if}
{#if topics.length === 3}
	<div
		class="absolute flex flex-col"
		style:width="{width}px"
		style:height="{height}px"
		style:left="{x - width / 2}px"
		style:top="{y - height / 2}px"
	>
		<div class="w-full h-full relative flex">
			<div
				class="absolute m-auto"
				style:width="{width / 2}px"
				style:height="{height / 2}px"
				style:transform="translate({width / 2}px,{height / 2}px)"
				style:background={topics[2].color}
			/>
			<div class="flex-grow" style:background={topics[0].color} />
			<div class="flex-grow" style:background={topics[1].color} />
		</div>
	</div>
{/if}

{#if topics.length === 4}
	<div
		class="absolute flex flex-col"
		style:width="{width}px"
		style:height="{height}px"
		style:left="{x - width / 2}px"
		style:top="{y - height / 2}px"
	>
		<div class="w-full h-full relative flex">
			<div
				style:width="{width / 2}px"
				style:height="{height / 2}px"
				class="flex-grow"
				style:background={topics[0].color}
			/>
			<div
				style:width="{width / 2}px"
				style:height="{height / 2}px"
				class="flex-grow"
				style:background={topics[1].color}
			/>
			<div
				style:width="{width / 2}px"
				style:height="{height / 2}px"
				class="flex-grow"
				style:background={topics[2].color}
			/>
			<div
				style:width="{width / 2}px"
				style:height="{height / 2}px"
				class="flex-grow"
				style:background={topics[3].color}
			/>
		</div>
	</div>
{/if}
