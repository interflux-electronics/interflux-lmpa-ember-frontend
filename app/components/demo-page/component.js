import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'demo',
  actions: {
    requestDemo() {
      console.log('send request');
      this.get('demoRequest').save();
    }
  }
});
