import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({

  // Start Google Analytics
  startTracking() {
    if (!ga) { return; }
    ga('create', {
      trackingId: config.googleAnalytics.trackingId,
      cookieDomain: config.googleAnalytics.cookieDomain
    });
    ga('set', {
      dimension1: 'LMPA',
      dimension2: config.environment,
    });
  },

  // Hit Google Analytics with a pageview
  sendPageView(currentRoute) {
    if (!ga) { return; }
    ga('set', {
      page: window.location.pathname,
      hostname: window.location.host,
      title: document.title,
      dimension3: currentRoute.routeName.replace(/\./g, '/'),
    });
    ga('send', 'pageview');
  }

});
