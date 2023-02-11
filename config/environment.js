'use strict';

const PKG = require('../package.json');

// Expose the git hash for fingerprinting and error logging
const git = require('git-rev-sync');
const gitBranch = git.branch();
const gitRevision = git.short();

// The Rails API namespace
const apiNamespace = 'v1/public';

// Where the Rails backend is located
const apiHosts = {
  production: 'https://rails.api.interflux.com',
  development: 'http://localhost:3000'
};

// Where the CDN is located
const cdnHosts = {
  production: 'https://cdn.interflux.com',
  development: 'http://localhost:9000',
  test: 'http://localhost:9000'
};

// Where this Ember app is located
const publicHosts = {
  production: 'https://interflux.com',
  development: 'http://localhost:4200'
};

const adminHosts = {
  production: 'https://admin.interflux.com',
  development: 'http://localhost:4300'
};

const groupHosts = {
  production: 'https://interflux.group',
  development: 'http://localhost:4400'
};

const lmpaHosts = {
  production: 'https://lmpa-q.com',
  development: 'http://localhost:4500'
};

// The UTC date and time of when this build was compiled
const date = new Date();
const buildTimestamp = date.toUTCString();

module.exports = function(env) {
  // Environment flags
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';
  const isTest = env === 'test';

  // Hosts
  const apiHost = apiHosts[env];
  const cdnHost = cdnHosts[env];
  const publicHost = publicHosts[env];
  const adminHost = adminHosts[env];
  const groupHost = groupHosts[env];
  const lmpaHost = lmpaHosts[env];

  const ENV = {
    appName: PKG.name,
    modulePrefix: PKG.name,
    environment: env,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {},

    isDevelopment,
    isTest,
    isProduction,

    apiHost,
    cdnHost,
    publicHost,
    adminHost,
    groupHost,
    lmpaHost,

    apiNamespace,

    gitBranch,
    gitRevision,
    buildTimestamp,

    fastboot: {
      hostWhitelist: [
        'lmpa.interflux.com',
        'lmpa-q.com',
        '0.0.0.0:8000',
        'localhost:4500'
      ]
    },

    googleAnalytics: {
      trackingId: 'UA-34474019-11'
    },

    mixPanel: {
      token: '108f7f07c111c43a83a2365ef952fc06'
    }
  };

  if (isTest) {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
