const register = ({ strapi }: { strapi: any }) => {
  strapi.customFields.register({
    name: 'address-autocomplete',
    plugin: 'locale-select',
    type: 'string',
    // Có thể bổ sung thêm các option khác nếu cần thiết
  });
};
export default register;
