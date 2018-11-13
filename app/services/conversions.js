import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  googleAnalytics: service(),

  logUserAction(msg) {
    this.googleAnalytics.sendEvent('Conversions', `User ${msg}`);
  }
});
