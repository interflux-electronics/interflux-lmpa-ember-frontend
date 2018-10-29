'use strict';

// Access ENV from config/environment
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const buildConfig = require('./config/environment')(EmberApp.env()).buildConfig;

const { isProduction, isDevelopment, gitRevision } = buildConfig;

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

    fingerprint: {
      enabled: isProduction || isDevelopment,
      extensions: [
        'js',
        'css',
        'png',
        'jpg',
        'svg',
        'map',
        'mp4',
        'ogg',
        'webp',
        'webm',
        'woff',
        'woff2'
      ],
      replaceExtensions: ['html', 'css', 'scss', 'js'],
      customHash: gitRevision
    },

    // Include polyfills for old browsers
    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  app.import('node_modules/animejs/anime.min.js');

  return app.toTree();
};
