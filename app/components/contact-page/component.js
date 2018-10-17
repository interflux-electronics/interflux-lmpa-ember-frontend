import Ember from 'ember';

export default Ember.Component.extend({
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
