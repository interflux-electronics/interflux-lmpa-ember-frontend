import PageComponent from '../page-base/component';

export default PageComponent.extend({
  elementId: 'page-speed',

  didInsertElement() {
    this._super(...arguments);
    document.querySelectorAll('video').forEach(video => {
      video.play();
    });
  },

  click() {
    document.querySelectorAll('video').forEach(video => {
      video.play();
    });
  }
});
