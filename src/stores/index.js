import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { updateCurrentUser } from 'firebase/auth';

const storedItems = JSON.parse(browser && localStorage.getItem('store')) || {
	envs: [],
	currentUser: undefined
};
export const store = writable(browser && storedItems);
store.subscribe((val) => browser && (localStorage.store = JSON.stringify(val)));

export const updateStoreUser = (u) => {
	store.update(obj => ({ ...obj, currentUser: { ...(obj.currentUser || {}), ...u } }))

}
// async function loadCards(envId) {
// 	const snapRef2 = await getDocs(collection(db, 'card-envs', envId, 'cards'));
// 	const cards = snapRef2.docs.map((doc) => {
// 		return doc.data();
// 	});

// 	store.update((obj) => {
// 		const nextState = produce(obj, (draft) => {
// 			const envIndex = draft.envs.findIndex((d) => d.id === envId);
// 			draft.envs[envIndex].cards = cards;
// 		});
// 		return nextState;
// 	});
// }

// async function loadCardEnvironments() {
// 	return getDocs(collection(db, 'card-envs'))
// 		.then((snap) => {
// 			store.update((obj) => ({ ...obj, envs: snap.docs.map((d) => d.data()) }));
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// }

/**
 * @param {any} envs
 */
// function setEnvs(envs) {
// 	store.update((obj) => ({ ...obj, envs }));
// }

// export { setEnvs };
