<script>
	// src/i18n.js
	import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

	register('en', () => import('./en.json'));
	register('fr', () => import('./fr.json'));
	register('nl', () => import('./nl.json'));
	// en, en-US and pt are not available yet

	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});
	locale.set('en');
</script>
