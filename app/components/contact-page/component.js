import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'contact',
  actions: {
    requestDemo() {
      this.get('demoRequest').save();
    }
  }
});
