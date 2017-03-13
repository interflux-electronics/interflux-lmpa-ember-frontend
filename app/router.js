import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('locale', { path: '/en' }, function() {
    this.route('solder-faster', { path: '/solder-5-times-faster-than-SAC-and-with-zero-defects' });
    this.route('reduce-voiding', { path: '/how-to-reduce-solder-voiding' });
    this.route('reduce-costs', { path: '/reduce-costs' });
    this.route('heat-failures', { path: '/heat-failures' });
    this.route('free-demo', { path: '/free-demo' });
  });
});

export default Router;
