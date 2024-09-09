module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/bird/update/all',
      handler: 'api::bird.update.all',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/bird/update/region/:region',
      handler: 'api::bird.update.region',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/bird/update/bird/:bird',
      handler: 'api::bird.update.bird',
      config: {
        auth: false,
      },
    },
  ],
}
