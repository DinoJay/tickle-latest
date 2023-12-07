import { writable } from 'svelte/store';

export const popUpStore = writable({ text: null, title: null, open: false, onConfirm: d => d, onCancel: d => d });

export const togglePopUp = (obj) => {
	popUpStore.update((oldArgs) => {
		return { ...oldArgs, open: true, ...obj };
	});
};
