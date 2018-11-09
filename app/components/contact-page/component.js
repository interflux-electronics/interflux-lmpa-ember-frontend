import PageComponent from '../page-base/component';

import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default PageComponent.extend({
  elementId: 'contact-page',

  conversions: service(),

  showEmail: false,
  showForm: false,

  actions: {
    showEmail() {
      this.conversions.logUserAction('clicked "Show Email"');
      set(this, 'showEmail', true);
    },
    showForm() {
      this.conversions.logUserAction('clicked "Show Form"');
      set(this, 'showForm', true);
    }
  }
});
