/**
 * Application methods
 */
import bootstrap from './bootstrap';
import destroy from './destroy';
import register from './register';

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
		// Đã xóa đăng ký custom field phía server để tránh lỗi invariant
		// Nếu cần logic khác, thêm ở đây
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