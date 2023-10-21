
import { EN, FR, NL, activityLocales, descriptionLocales, linksLocales, titleLocales, videosLocales } from '$lib/constants/locales';
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

export const titleLocale = derived(locale, ($a) => titleLocales[$a]);
export const descriptionLocale = derived(locale, ($a) => descriptionLocales[$a]);
export const activityLocale = derived(locale, ($a) => activityLocales($a));
export const linksLocale = derived(locale, ($a) => linksLocales[$a]);
export const videosLocale = derived(locale, ($a) => videosLocales[$a]); 