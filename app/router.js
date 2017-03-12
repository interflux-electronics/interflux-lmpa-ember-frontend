import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('locale', { path: '/en' }, function() {
    this.route('speed', { path: '/solder-5-times-faster-than-SAC-and-with-zero-defects' });
    this.route('voiding', { path: '/how-to-reduce-solder-voiding' });
    this.route('costs', { path: '/lower-production-costs' });
  });
});

export default Router;
