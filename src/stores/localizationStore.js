
import { EN, FR, NL } from '$lib/constants/locales';
import { writable, get } from 'svelte/store';
import en from './en.json'
import fr from './fr.json'
import nl from './nl.json'
import { derived } from 'svelte/store';


export const locale = writable(undefined);

export const langDict = derived(
    locale,
    ($a, set) => {
        if ($a === EN) return set(en);
        if ($a === FR) return set(fr);
        if ($a === NL) return set(nl);

    }
); 