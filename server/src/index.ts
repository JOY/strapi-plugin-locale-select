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
		// Register custom fields for Strapi admin and schema compatibility
		// This is required so Strapi can recognize and use these custom fields in content-types/components
		const fields = [
			'timezone-select',
			'country-select',
			'currency-select',
			'language-select',
		];

		fields.forEach((name) =>
			strapi.customFields.register({
				name,                    // Must match the name used in the admin registration
				plugin: 'locale-select', // Plugin ID, must match admin and schema usage
				type: 'string',          // Database column type
			})
		);

		// Call original register logic if exists
		if (typeof register === 'function') {
			register({ strapi });
		}
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