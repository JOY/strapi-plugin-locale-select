// Controller for plugin settings

export default {
  async getSettings(ctx) {
    try {
      console.log('Getting settings from plugin store...');
      const pluginStore = strapi.store({
        environment: '',
        type: 'plugin',
        name: 'locale-select',
      });

      const settings = await pluginStore.get({ key: 'settings' }) || {};
      console.log('Retrieved settings:', settings);
      
      // Make sure we're sending a properly formatted JSON object
      ctx.body = settings;
      ctx.type = 'application/json';
    } catch (error) {
      console.error('Error getting settings:', error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to get settings' };
      ctx.type = 'application/json';
    }
  },

  async setSettings(ctx) {
    try {
      console.log('Setting plugin settings...');
      const { body } = ctx.request;
      console.log('Received settings data:', body);
      
      const pluginStore = strapi.store({
        environment: '',
        type: 'plugin',
        name: 'locale-select',
      });

      await pluginStore.set({
        key: 'settings',
        value: body,
      });

      console.log('Settings saved successfully');
      
      // Make sure we're sending a properly formatted JSON response
      ctx.body = { ok: true };
      ctx.type = 'application/json';
    } catch (error) {
      console.error('Error saving settings:', error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to save settings' };
      ctx.type = 'application/json';
    }
  },
};
