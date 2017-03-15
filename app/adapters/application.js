import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'https://api.interflux.com',
  namespace: 'lmpa/v1'
});
