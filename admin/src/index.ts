import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';

/* UI shell */
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

/* Icons
   – Clock is shipped with @strapi/icons (rc 23).
   – Country / Currency / Language are your own SVG components in /icons. */
import { Clock as TimezoneIcon }  from '@strapi/icons';
import CountryIcon   from './icons/CountryIcon';
import CurrencyIcon  from './icons/CurrencyIcon';
import LanguageIcon  from './icons/LanguageIcon';

/* -------------------------------------------------------------------------- */
/*  MAIN                                                                      */
/* -------------------------------------------------------------------------- */
export default {
  register(app: any) {
    /* ---------- Time-zone ------------------------------------------------- */
    app.customFields.register({
      name: 'timezone-select',
      pluginId: PLUGIN_ID,
      type: 'string',
      icon: TimezoneIcon,
      intlLabel: {
        id: getTranslation('timezone.label'),
        defaultMessage: 'Timezone',
      },
      intlDescription: {
        id: getTranslation('timezone.description'),
        defaultMessage: 'Select an IANA timezone',
      },
      components: { Input: async () => import('./components/TimezoneSelect') },
    });

    /* ---------- Country --------------------------------------------------- */
    app.customFields.register({
      name: 'country-select',
      pluginId: PLUGIN_ID,
      type: 'string',
      icon: CountryIcon,
      intlLabel: {
        id: getTranslation('country.label'),
        defaultMessage: 'Country',
      },
      intlDescription: {
        id: getTranslation('country.description'),
        defaultMessage: 'Select an ISO-3166 country',
      },
      components: { Input: async () => import('./components/CountrySelect') },
    });

    /* ---------- Currency -------------------------------------------------- */
    app.customFields.register({
      name: 'currency-select',
      pluginId: PLUGIN_ID,
      type: 'string',
      icon: CurrencyIcon,
      intlLabel: {
        id: getTranslation('currency.label'),
        defaultMessage: 'Currency',
      },
      intlDescription: {
        id: getTranslation('currency.description'),
        defaultMessage: 'Select an ISO-4217 currency',
      },
      components: { Input: async () => import('./components/CurrencySelect') },
    });

    /* ---------- Language -------------------------------------------------- */
    app.customFields.register({
      name: 'language-select',
      pluginId: PLUGIN_ID,
      type: 'string',
      icon: LanguageIcon,
      intlLabel: {
        id: getTranslation('language.label'),
        defaultMessage: 'Language',
      },
      intlDescription: {
        id: getTranslation('language.description'),
        defaultMessage: 'Select an IETF language tag',
      },
      components: { Input: async () => import('./components/LanguageSelect') },
    });

    /* ---------- Optional left-menu link ----------------------------------- */
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'Locale Select',
      },
      Component: async () => {
        const { App } = await import('./pages/App');
        return App;
      },
    });

    /* ---------- Register plugin shell ------------------------------------ */
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: 'locale-select',
    });
  },

  /* ---------------- Load translations ------------------------------------ */
  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(
            /* webpackChunkName: "locale-select-i18n-[request]" */
            `./translations/${locale}.json`
          );
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
