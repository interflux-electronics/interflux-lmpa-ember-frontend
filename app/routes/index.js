import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('locale.solder-faster');
  }
});
