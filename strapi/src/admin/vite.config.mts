import { mergeConfig } from 'vite'

export default (config: any) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: [
        {
          find: '@strapi/design-system/v2',
          replacement: '@strapi/design-system',
        },
      ],
    },
    server: {
      fs: {
        allow: [
          '/opt/node_modules', // this is the abs path OUTSIDE the project root causing the Vite error
          '/opt/app',
        ],
      },
    },
  })
}
