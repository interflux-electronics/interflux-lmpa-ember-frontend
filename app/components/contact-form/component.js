import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout, all } from 'ember-concurrency';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  elementId: 'contact-form',

  store: service(),
  fastboot: service(),
  ipMeta: service(),

  isFastBoot: readOnly('fastboot.isFastBoot'),

  // Records created on init()
  company: undefined,
  person: undefined,
  message: undefined,

  // Fetched on init();
  countries: undefined,

  // Flag set after user submits form
  showSuccess: false,
  showError: false,

  init() {
    this._super(...arguments);

    if (this.isFastBoot) {
      return false;
    }

    const { region, city, query } = this.ipMeta.data;

    const lead = this.store.createRecord('lead', {
      // name: 'Jan Werkhoven',
      // company: 'Interflux Electronics',
      // email: 'jw@interflux.com',
      // mobile: '+61424787652',
      // message: 'Hello Interflux, can you send me your best expert.',
      purpose: 'Request LMPA demo',
      source: window.location.href,
      ipRegion: region,
      ipCity: city,
      ip: query
    });

    this.set('lead', lead);

    this.fetchCountries.perform();
  },

  fetchCountries: task(function*() {
    // Fetch all countries for the country search input.
    const countries = yield this.store.findAll('country');
    this.set('countries', countries);

    // Deduct the user's country from their IP
    const ipCountryCode = this.ipMeta.data.countryCode;
    const ipCountry = countries.findBy('countryCode', ipCountryCode);
    this.lead.set('ipCountry', ipCountry);
  }),

  countryPlaceholder: computed(function() {
    return this.ipMeta.data.country || 'Belgium';
  }),

  // Persist the lead to our API, which should return a UUID.
  submit: task(function*() {
    //
    // TODO: Log conversion event
    //
    const request = this.lead
      .save()
      .then(lead => {
        return lead;
      })
      .catch(error => {
        return error;
      });

    const tasks = [];
    tasks.push(request);
    tasks.push(timeout(1000)); // Deliberately wait for 1 seconds to prevent quick flash
    yield all(tasks);
    if (request._result.id) {
      this.set('showSuccess', true);
      //
      // TODO: Log conversion event
      //
    } else {
      this.set('showError', true);
      //
      // TODO: Log conversion event
      // TODO: Log error
      // TODO: If 500 show error message
      // TODO: If 422 let user try again
      //
    }
  }).drop(),

  actions: {
    focusOnNextField() {
      //
    }
  }
});
