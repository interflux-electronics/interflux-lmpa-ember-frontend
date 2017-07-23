/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {

  const app = new EmberApp(defaults, {

    // Makes SASS listent to file changes in the component folders
    sassOptions: {
      includePaths: ['app/components']
    },

    // Adds CSS browser prefixes
    autoprefixer: {
      browsers: ['> 1%', 'Explorer > 9', 'Firefox >= 17', 'Chrome >= 10', 'Safari >= 6', 'iOS >= 6'],
      cascade: false,
      remove: false
    },

    'ember-cli-prerender': {
      sitemap: {
        rootUrl: 'https://lmpa.interflux.com/',
      }
    }

  });

  app.import('bower_components/velocity/velocity.min.js'); // Replacement for jQuery .animate() for handling CSS3 animations
  app.import('vendor/google-analytics.js');

  return app.toTree();
};
