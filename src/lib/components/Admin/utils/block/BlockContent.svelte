<script>
	export let element = {};
	export let currentElement = {};
	export let selectedElement = '';
	export let isLightBoxOpen = false;
	export let isCard = false;
	export let onClick = () => {
		selectElementOrOpenLightbox(element);
	};

	const selectElementOrOpenLightbox = (element) => {
		if (selectedElement != element.id) {
			selectedElement = element.id;
		} else {
			isLightBoxOpen = true;
			currentElement = element;
		}
	};
</script>

<div
	on:keydown={() => null}
	class="flex h-full w-full justify-center items-center
		whitespace-nowrap text-ellipsis cursor-pointer
		transition-colors border-2
		{selectedElement == element.id ? 'bg-gray-300 hover:bg-blue-100' : 'hover:bg-c-gray'}
		{isCard ? 'flex-col' : ''}"
	on:click={() => onClick()}
>
	{#if element?.img && isCard}
		<div class="flex justify-center items-center h-[3rem] w-[14rem] px-1">
			<p class="overflow-hidden text-ellipsis text-center font-medium">
				{element.title}
			</p>
		</div>
		<img
			class="h-[9rem] w-full mt-auto"
			src={element?.img.url}
			alt={element?.img.name}
			style="object-fit: cover;"
		/>
	{:else}
		<div class="m-auto  text-lg p-1">
			{element?.name || element?.title}
		</div>
	{/if}
</div>
