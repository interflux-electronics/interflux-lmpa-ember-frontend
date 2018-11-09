import PageComponent from '../page-base/component';

export default PageComponent.extend({
  elementId: 'intro-page',
  process: 'selective',
  actions: {
    setProcess(process) {
      this.set('process', process);
    }
  }
});
