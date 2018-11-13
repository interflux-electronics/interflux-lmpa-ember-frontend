import PageComponent from '../page-base/component';
import { computed } from '@ember/object';

export default PageComponent.extend({
  elementId: 'page-interflux',
  years: computed(function() {
    const currentYear = new Date().getFullYear();
    const foundationYear = 1980;
    return currentYear - foundationYear;
  })
});
