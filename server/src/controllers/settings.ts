// Controller for plugin settings

export default {
  async getSettings(ctx) {
    const pluginStore = strapi.store({
      environment: '',
      type: 'plugin',
      name: 'locale-select',
    });

    const settings = await pluginStore.get({ key: 'settings' }) || {};
    ctx.send(settings);
  },

  async setSettings(ctx) {
    const { body } = ctx.request;
    
    const pluginStore = strapi.store({
      environment: '',
      type: 'plugin',
      name: 'locale-select',
    });

    await pluginStore.set({
      key: 'settings',
      value: body,
    });

    ctx.send({ ok: true });
  },
};
