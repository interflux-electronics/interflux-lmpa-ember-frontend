import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'interflux',
  years: computed(function() {
    const currentYear = new Date().getFullYear();
    const foundationYear = 1980;
    return currentYear - foundationYear;
  })
});
