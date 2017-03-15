import Ember from 'ember';

const sequence = [
  'locale.solder-faster',
  'locale.reduce-voiding',
  'locale.reduce-costs',
  'locale.heat-failures',
  'locale.free-demo'
];
const lastIndex = sequence.length - 1;

export default Ember.Component.extend({
  tagName: 'footer',
  router: Ember.inject.service('-routing'),

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
