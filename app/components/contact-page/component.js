import Component from '@ember/component';

export default Component.extend({
  tagName: 'main',
  elementId: 'contact',
  actions: {
    requestContact() {
      this.contactRequest.save();

      // TODO Send to Formspree
      // TODO Send GA event with category "contact form" and action "submit"
    }
  }
});
