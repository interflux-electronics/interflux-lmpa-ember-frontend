import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  googleAnalytics: service(),
  mixPanel: service(),

  trackEvent(data) {
    if (!data.category || !data.event) {
      // TODO: log issue
      return;
    }

    // Google Analytics
    this.googleAnalytics.sendEvent(data.category, data.event);

    // Mixpanel
    const name = data.event;
    const properties = data;
    delete properties['event'];
    this.mixPanel.trackEvent(name, properties);
  }
});
