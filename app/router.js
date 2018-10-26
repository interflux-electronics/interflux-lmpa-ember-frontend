import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { on } from '@ember/object/evented';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  googleAnalytics: service(),
  headData: service(),

  onInit: on('init', function() {
    this.googleAnalytics.startTracking();
  }),

  onEachDidTransition: on('didTransition', function() {
    const currentRoute = getOwner(this).lookup(
      'route:' + this.currentRouteName
    );
    this.googleAnalytics.sendPageView(currentRoute);
  }),

  // For setting the meta title
  setTitle(title) {
    this.get('headData').set('title', title);
  }
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
