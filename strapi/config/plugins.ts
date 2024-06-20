export default () => ({
  'strapi-cloud': false,
  'schemas-to-ts': {
    enabled: true,
    config: {
      destinationFolder: 'src/types',
      logLevel: 4,
    },
  },
  purah: {
    enabled: true,
    resolve: './src/plugins/purah',
  },
})
