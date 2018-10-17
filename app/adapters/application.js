import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  authorizer: 'authorizer:application',
  host: 'http://localhost:3000',

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },

  // headers: {
  //   'Accept': 'application/au.com.hotdoc.v5'
  // },
  // host: 'https://api.interflux.com',
  // namespace: 'lmpa',
  // host: Ember.ENV.serverURL || ""

  // Rails expects underscored resources instead of hyphens
  pathForType: function(type) {
    return Ember.String.underscore(type);
  }
});
