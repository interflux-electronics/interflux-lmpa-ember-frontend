import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('locale', { path: '/en' }, function() {
    this.route('intro', { path: '/low-melting-point-soldering-alloys' });
    this.route('speed', { path: '/solder-faster-and-with-zero-defects' });
    this.route('voiding', { path: '/reduce-solder-voiding' });
    this.route('costs', { path: '/reduce-production-costs-and-increase-capacity' });
    this.route('heat-failures', { path: '/avoid-heat-related-solder-failures' });
    this.route('contact', { path: '/request-free-demo' });
  });
});

export default Router;
