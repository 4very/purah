export default () => ({
  'strapi-cloud': false,
  'schemas-to-ts': {
    enabled: true,
    config: {
      destinationFolder: 'src/types',
      logLevel: 4,
    },
  },
})
