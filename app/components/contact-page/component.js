import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'main',
  elementId: 'contact',

  store: service(),

  countries: undefined,

  fetchCountries: task(function*() {
    const countries = yield this.store.findAll('country');
    this.set('countries', countries);
  })
});
