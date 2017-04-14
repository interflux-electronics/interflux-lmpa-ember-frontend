import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({

  location: config.locationType,
  rootURL: config.rootURL,
  seo: Ember.inject.service(),

  onInit: Ember.on('init', function() {

    // Set up Google Analytics on init
    if (ga) {
      ga('create', {
        trackingId: config.googleAnalytics.trackingId,
        cookieDomain: config.googleAnalytics.cookieDomain
      });
      ga('set', {
        dimension1: 'LMPA',
        dimension2: config.environment,
      });
    }

  }),

  onEachDidTransition: Ember.on('didTransition', function() {
    const currentRoute = Ember.getOwner(this).lookup('route:' + this.currentRouteName);

    // Hit Google Analytics on page transitions
    if (ga) {
      ga('set', {
        page: window.location.pathname,
        hostname: window.location.host,
        title: document.title,
        dimension3: currentRoute.routeName.replace(/\./g, '/'),
      });
      ga('send', 'pageview');
    }

    // Set the <meta name="robots" content="index, follow">
    // Looks for the properties `robotIndex:true` and `robotFollow:false` on the route
    this.get('seo').setRobotMeta(currentRoute.get('robotIndex'), currentRoute.get('robotFollow'));

  })

});

Router.map(function() {
  this.route('locale', { path: '/en' }, function() {
    this.route('intro', { path: '/low-melting-point-soldering-alloys' });
    this.route('speed', { path: '/fast-selective-soldering-with-zero-defects' });
    this.route('voiding', { path: '/drastically-reduce-solder-voiding' });
    this.route('costs', { path: '/reduce-production-costs-and-increase-capacity' });
    this.route('heat-failures', { path: '/avoid-heat-related-solder-failures' });
    this.route('dross', { path: '/reduce-dross-formation-when-wave-soldering' });
    this.route('wetting', { path: '/excellent-wetting' });
    this.route('interflux', { path: '/developed-by-interflux-electronics' });
    this.route('contact', { path: '/request-free-demo' });
  });
});

export default Router;
