
import { EN, FR, NL } from '$lib/constants/locales';
import { writable, get } from 'svelte/store';
import en from './en.json'
import fr from './fr.json'
import nl from './nl.json'

export const locale = writable(undefined);

export const langDict = () => {
    if (get(locale) === EN) return en;
    if (get(locale) === FR) return fr;
    if (get(locale) === NL) return nl;
}