import Component from '@ember/component';

export default Component.extend({
  tagName: 'header',
  elementId: 'app-header',
  actions: {
    openLiveChat() {
      window.LiveChatWidget.call('maximize');
    }
  }
});
