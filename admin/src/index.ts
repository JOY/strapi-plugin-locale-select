import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';

/* UI */
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import TimezoneIcon from './components/TimezoneSelectIcon';   // icon đồng hồ
import CountryIcon from '@strapi/icons';                 // icon flag (Strapi design-system)

/* -------------------------------------------------------------------------- */
/*  MAIN                                                                      */
/* -------------------------------------------------------------------------- */
export default {
  register(app: any) {
    /* -------- Timezone select -------------------------------------------- */
    app.customFields.register({
      name: 'timezone-select',          // << tên custom-field
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
      components: {
        Input: async () => import('./components/TimezoneSelect'),
      },
    });

    /* -------- Country select --------------------------------------------- */
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
      components: {
        Input: async () => import('./components/CountrySelect'),
      },
    });

    /* -------- Optional menu link (docs / settings) ----------------------- */
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

    /* -------- Register plugin shell -------------------------------------- */
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: 'locale-select',
    });
  },

  /* ---------------- Translations loader ---------------------------------- */
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
