/**
 * Application methods
 */
import bootstrap from './bootstrap';
import destroy from './destroy';

/**
 * Plugin server methods
 */
import config from './config';
import contentTypes from './content-types';
import controllers from './controllers';
import middlewares from './middlewares';
import policies from './policies';
import routes from './routes';
import services from './services';

export default {
  register({ strapi }) {
    // Đăng ký custom field address-autocomplete
    strapi.customFields.register({
      name: 'address-autocomplete',
      plugin: 'locale-select',
      type: 'string',
    });
    
    // Đăng ký custom field country-select
    strapi.customFields.register({
      name: 'country-select',
      plugin: 'locale-select',
      type: 'string',
    });
    
    // Đăng ký custom field currency-select
    strapi.customFields.register({
      name: 'currency-select',
      plugin: 'locale-select',
      type: 'string',
    });
    
    // Đăng ký custom field language-select
    strapi.customFields.register({
      name: 'language-select',
      plugin: 'locale-select',
      type: 'string',
    });
    
    // Đăng ký custom field timezone-select
    strapi.customFields.register({
      name: 'timezone-select',
      plugin: 'locale-select',
      type: 'string',
    });
    
    // Đăng ký custom field location-select
    strapi.customFields.register({
      name: 'location-select',
      plugin: 'locale-select',
      type: 'string',
    });
  },
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares,
};