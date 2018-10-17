import Ember from 'ember';
import config from './config/environment';

const { inject, on } = Ember;

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  seo: inject.service(),
  googleAnalytics: inject.service(),

  onInit: on('init', function() {
    this.get('googleAnalytics').startTracking();
  }),

  onEachDidTransition: on('didTransition', function() {
    const currentRoute = Ember.getOwner(this).lookup(
      'route:' + this.currentRouteName
    );
    this.get('seo').setMetaTags(currentRoute);
    this.get('googleAnalytics').sendPageView(currentRoute);
  })
});

Router.map(function() {
  this.route('test');
  this.route('locale', { path: '/en' }, function() {
    this.route('intro', { path: '/low-melting-point-alloys' });
    this.route('overview', { path: '/low-melting-point-soldering-alloys' });
    this.route('speed', {
      path: '/fast-selective-soldering-with-zero-defects'
    });
    this.route('voiding', { path: '/drastically-reduce-solder-voiding' });
    this.route('costs', {
      path: '/reduce-production-costs-and-increase-capacity'
    });
    this.route('heat-failures', {
      path: '/avoid-heat-related-solder-failures'
    });
    this.route('dross', {
      path: '/reduce-dross-formation-when-wave-soldering'
    });
    this.route('wetting', { path: '/excellent-wetting' });
    this.route('interflux', { path: '/developed-by-interflux-electronics' });
    this.route('contact', { path: '/request-free-demo' });
    this.route('catchall', { path: '*:' });
  });
  this.route('catchall', { path: '*:' });
});

export default Router;
