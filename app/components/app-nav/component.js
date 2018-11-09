import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const sequence = [
  'locale.intro',
  'locale.overview',
  'locale.speed',
  'locale.voiding',
  'locale.costs',
  'locale.heat-failures',
  'locale.dross',
  'locale.wetting',
  'locale.interflux',
  'locale.contact'
];
const lastIndex = sequence.length - 1;

export default Component.extend({
  tagName: 'nav',
  classNames: ['app-nav'],
  router: service('-routing'),

  allRoutes: sequence,

  // Returns position of current route in the sequence
  currentIndex: computed('router.currentRouteName', function() {
    return sequence.indexOf(this.get('router.currentRouteName'));
  }),

  // Returns next route in sequence
  nextRoute: computed('router.currentRouteName', function() {
    let next = this.currentIndex + 1;
    next = next > lastIndex ? 0 : next;
    return sequence[next];
  }),

  // Returns previous route in sequence
  prevRoute: computed('router.currentRouteName', function() {
    let prev = this.currentIndex - 1;
    prev = prev < 0 ? lastIndex : prev;
    return sequence[prev];
  })
});
