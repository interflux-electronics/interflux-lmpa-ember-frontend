import Service from '@ember/service';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { or, readOnly } from '@ember/object/computed';

const { appName, environment, googleAnalytics } = config;
const { isTest } = config.buildConfig;

export default Service.extend({
  fastboot: service(),
  user: service(),

  isDisabled: or('isFastBoot', 'isInterflux', 'isMissingGlobal'),
  isFastBoot: readOnly('fastboot.isFastBoot'),
  isInterflux: readOnly('user.isInterflux'),
  isMissingGlobal: computed(function() {
    try {
      return googleAnalytics.trackingId && ga ? false : true;
    } catch (e) {
      return true;
    }
  }),

  // Load and initialise the Google Analytics script
  setup() {
    if (this.isFastBoot || this.isInterflux || isTest) {
      return;
    }

    // prettier-ignore
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    if (this.isMissingGlobal) {
      return;
    }

    ga('create', { trackingId: googleAnalytics.trackingId });
    ga('set', {
      dimension1: appName,
      dimension2: environment
    });
  },

  // Send a page view to GA
  // Documentation: https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
  sendPageView(currentRoute) {
    if (this.isDisabled) {
      return;
    }

    ga('set', {
      page: window.location.pathname,
      hostname: window.location.host,
      title: document.title,
      dimension3: currentRoute.routeName.replace(/\./g, '/'),
      dimension4: localStorage.getItem('interflux-human') ? 'yes' : 'no'
    });

    ga('send', 'pageview');
  },

  // Send event to Google Analytics
  // Documentation: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
  sendEvent(category, action, label, value) {
    if (this.isDisabled) {
      return;
    }

    if (!category || !action) {
      return;
    }

    const obj = {
      hitType: 'event',
      eventCategory: category,
      eventAction: action
    };

    if (label) {
      obj.eventLabel = label;
    }

    if (value) {
      obj.eventValue = value;
    }

    ga('send', obj);
  }
});
