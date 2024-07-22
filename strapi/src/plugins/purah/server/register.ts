import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'EXIF',
    plugin: 'purah',
    type: 'json',
    inputSize: {
      // optional
      default: 12,
      isResizable: true,
    },
  })

  strapi.customFields.register({
    name: 'PhotoKey',
    plugin: 'purah',
    type: 'string',
    inputSize: {
      // optional
      default: 12,
      isResizable: true,
    },
  })

  strapi.customFields.register({
    name: 'FilterSelect',
    plugin: 'purah',
    type: 'json',
    inputSize: {
      // optional
      default: 12,
      isResizable: true,
    },
  })
}
