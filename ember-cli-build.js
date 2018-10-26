'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const env = EmberApp.env();
const isProduction = env === 'production';

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Makes SASS listen to file changes in the component folders
    sassOptions: {
      includePaths: ['app/components'],
      overwrite: true
    },

    // Adds CSS browser prefixes
    autoprefixer: {
      browsers: [
        '> 1%',
        'Explorer > 10',
        'Firefox >= 17',
        'Chrome >= 10',
        'Safari >= 6',
        'iOS >= 6'
      ],
      cascade: false,
      remove: false
    },

    // Prevent CSS minification in development and tests
    minifyCSS: {
      enabled: isProduction
    },

    // Prevent JS minification in development and tests
    minifyJS: {
      enabled: isProduction
    },

    // Enable source maps for debugging and Sentry
    sourcemaps: {
      enabled: isProduction,
      extensions: ['js']
    },

    // Only fingerprint assets for production builds that aren't the native app
    fingerprint: {
      enabled: isProduction,
      extensions: ['js', 'css']
    },

    // Include polyfills for old browsers
    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  app.import('node_modules/animejs/anime.min.js');

  return app.toTree();
};
