export const EN = 'en';
export const FR = 'fr';
export const NL = 'nl';

export const LANGS = [EN, FR, NL];

export const titleLocales = { [EN]: 'title_en', [FR]: 'title_fr', [NL]: 'title_nl' };

export const descriptionLocales = { [EN]: 'description_en', [FR]: 'description_fr', [NL]: 'description_nl' };

// export const activityValueLocales = { [EN]: 'value_en', [FR]: 'value_fr', [NL]: 'value_nl' };
export const activityLocales = (field) => ({ [EN]: 'activity_en', [FR]: 'activity_fr', [NL]: 'activity_nl' }[field]);

export const linksLocales = { [EN]: 'links_en', [FR]: 'links_fr', [NL]: 'links_nl' }

export const videosLocales = { [EN]: 'videos_en', [FR]: 'videos_fr', [NL]: 'videos_nl' };