import Ember from 'ember';

const sequence = [
  'locale.intro',
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

export default Ember.Component.extend({
  tagName: 'header',
  router: Ember.inject.service('-routing'),

  allRoutes: sequence,

  // Returns position of current route in the sequence
  currentIndex: Ember.computed('router.currentRouteName', function() {
    return sequence.indexOf(this.get('router.currentRouteName'));
  }),

  // Returns next route in sequence
  nextRoute: Ember.computed('router.currentRouteName', function() {
    let next = this.get('currentIndex') + 1;
    next = next > lastIndex ? 0 : next;
    return sequence[next];
  }),

  // Returns previous route in sequence
  prevRoute: Ember.computed('router.currentRouteName', function() {
    const currentIndex = sequence.indexOf(this.get('router.currentRouteName'));
    let prev = this.get('currentIndex') - 1;
    prev = prev < 0 ? lastIndex : prev;
    return sequence[prev];
  })
});
