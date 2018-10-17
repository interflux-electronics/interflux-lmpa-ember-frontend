import Ember from 'ember';

export default Ember.Route.extend({
  seoTitle: `Contact - Interflux`,
  seoDescription: `Contact Interflux for more information about LMPA and LMPA-Q.`,
  model() {
    return this.store.createRecord('contactRequest');
  }
});
