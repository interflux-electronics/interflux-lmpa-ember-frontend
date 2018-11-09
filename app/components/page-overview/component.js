import PageComponent from '../page-base/component';

export default PageComponent.extend({
  elementId: 'page-overview',
  process: 'selective',
  actions: {
    setProcess(process) {
      this.set('process', process);
    }
  }
});
