<script>
	import { select } from 'd3-selection';
	import Mapbox from '$lib/components/map/Mapbox.svelte';
	import DraggableMarker from '$lib/components/map/markers/DraggableMarker.svelte';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Logo from '$lib/components/navigationBar/Logo.svelte';
	import EditCard from '../cards/EditCard.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';
	import ActivityCard from '../cards/edit/activity/ActivityCard.svelte';

	export let selectedEnvId = null;
	export let selectedCardId = null;
	export let cards = [];
	export let onChange;
	/**
	 * @type {string | null}
	 */

	const DEFAULTLON = 4.39;
	const DEFAULTLAT = 50.82;

	$: updateCardCoords = () => {
		let docRef = doc(db, 'card-envs', selectedEnvId, 'cards', selectedCardId);

		return updateDoc(docRef, {
			loc: { longitude: lon, latitude: lat }
		});
	};

	$: setCard = (c) => {
		const newCards = cards.map((d) => {
			if (c.id === d.id) {
				return c;
			}
			return d;
		});
		const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', c.id);

		setDoc(docRef, c);
		onChange(newCards);
	};

	$: console.log('cards', cards);
	$: selectedCard = cards.find((c) => c.id === selectedCardId);
</script>

<div class="flex-grow">
	<Mapbox zoom={10} geoLocationMandatory={false}>
		{#each cards as c}
			<DraggableMarker
				onClick={() => {
					selectedCardId = c.id;
				}}
				onChange={(longitude, latitude) => setCard({ ...c, loc: { longitude, latitude } })}
				lon={c.loc?.longitude || DEFAULTLON}
				lat={c.loc?.latitude || DEFAULTLAT}
			/>
		{/each}
	</Mapbox>
	<LightBox isOpen={!!selectedCardId} close={() => (selectedCardId = null)}>
		<EditCard
			{selectedEnvId}
			currentCard={selectedCard}
			onRemove={(d) => {
				console.log('d', d);
				const newCards = cards.filter((oc) => oc.id !== d.id);
				onChange(newCards);
				const docRef = doc(db, 'card-envs', selectedEnvId, 'cards', selectedCardId);
				deleteDoc(docRef);
				selectedCardId = null;
			}}
			onChange={(c) => {
				setCard(c);
			}}
		/>
	</LightBox>
</div>
