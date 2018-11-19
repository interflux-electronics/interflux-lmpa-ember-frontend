import Service from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  // To avoid Interfluxers from messing with the conversion stats we ask them
  // to set a boolean in their localStorage.
  // localStorage.setItem('interflux-human', true)
  isInterflux: computed(function() {
    return localStorage.getItem('interflux-human') ? true : false;
  })
});
