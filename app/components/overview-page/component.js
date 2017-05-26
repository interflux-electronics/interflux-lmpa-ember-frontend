import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'overview',
  process: 'selective',
  actions: {
    setProcess(process) {
      this.set('process', process);
    }
  }
});
