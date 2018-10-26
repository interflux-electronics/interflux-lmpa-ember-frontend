import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'main',
  elementId: 'interflux',
  years: computed(function() {
    const currentYear = new Date().getFullYear();
    const foundationYear = 1980;
    return currentYear - foundationYear;
  })
});
