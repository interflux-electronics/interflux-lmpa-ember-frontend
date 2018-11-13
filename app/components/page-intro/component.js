import PageComponent from '../page-base/component';

export default PageComponent.extend({
  elementId: 'page-intro',
  process: 'selective',
  actions: {
    setProcess(process) {
      this.set('process', process);
    }
  }
});
