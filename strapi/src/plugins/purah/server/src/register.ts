import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'EXIF',
    plugin: 'purah',
    type: 'json',
    inputSize: {
      // optional
      default: 12,
      isResizable: true,
    },
  });

  strapi.customFields.register({
    name: 'PhotoKey',
    plugin: 'purah',
    type: 'string',
    inputSize: {
      // optional
      default: 12,
      isResizable: true,
    },
  });

  strapi.customFields.register({
    name: 'FilterSelect',
    plugin: 'purah',
    type: 'json',
    inputSize: {
      // optional
      default: 12,
      isResizable: true,
    },
  });
};

export default register;
