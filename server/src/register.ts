const register = ({ strapi }: { strapi: any }) => {
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
};
export default register;
