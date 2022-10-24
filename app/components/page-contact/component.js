import PageComponent from '../page-base/component';

import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default PageComponent.extend({
  elementId: 'page-contact',

  conversions: service(),

  showEmail: false,
  showForm: false,

  init() {
    this._super(...arguments);
    this.conversions.trackEvent({
      category: 'LMPA demo form',
      event: 'user sees contact page'
    });
  },

  actions: {
    showEmail() {
      set(this, 'showEmail', true);

      this.conversions.trackEvent({
        category: 'LMPA demo form',
        event: 'user clicked "Show Email"'
      });
    }
  }
});
