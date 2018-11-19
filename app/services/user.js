import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  // By adding #interflux-human to the URL the user will now be
  // remembered as an Interflux member and excluded from analytics.
  init() {
    this._super(...arguments);
    if (window.location.hash === '#interflux-human') {
      localStorage.setItem('interflux-human', true);
      this.removeHashFromURL();
    }
  },

  removeHashFromURL() {
    history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search
    );
  },

  // To avoid Interfluxers from messing with the conversion stats we ask them
  // to set a boolean in their localStorage.
  // localStorage.setItem('interflux-human', true)
  isInterflux: computed(function() {
    return localStorage.getItem('interflux-human') ? true : false;
  })
});
