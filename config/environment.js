/* jshint node: true */

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'lmpa-interflux-com',
    environment,
    rootURL: '/',
    locationType: 'history',
    googleAnalytics: {
      trackingId: 'UA-34474019-11'
    },
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {}
  };

  if (environment === 'production') {

  }

  if (environment === 'staging') {

  }

  if (environment === 'development') {

  }

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
