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
    // Đăng ký custom field chuẩn Strapi 5.x
    strapi.customFields.register({
      name: 'address-autocomplete',
      plugin: 'locale-select',
      type: 'string',
      // Có thể bổ sung thêm các option khác nếu cần thiết
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