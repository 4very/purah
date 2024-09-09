module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/gallery-view/filters/update',
      handler: 'api::gallery-view.filters.update',
      config: {
        auth: false,
      },
    },
  ],
}
