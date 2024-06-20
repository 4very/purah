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
}
