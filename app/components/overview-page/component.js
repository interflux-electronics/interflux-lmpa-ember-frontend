import Component from '@ember/component';

export default Component.extend({
  tagName: 'main',
  elementId: 'overview',
  process: 'selective',
  actions: {
    setProcess(process) {
      this.set('process', process);
    }
  }
});
