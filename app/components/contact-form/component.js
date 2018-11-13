import Component from '@ember/component';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import { task, timeout, all } from 'ember-concurrency';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'div',
  elementId: 'contact-form',

  // ajax: service(),
  store: service(),
  fastboot: service(),

  isFastBoot: readOnly('fastboot.isFastBoot'),

  // Records created on init()
  company: undefined,
  person: undefined,
  message: undefined,

  // Fetched on init();
  countries: undefined,
  ipMeta: undefined,

  // Flag set after user submits form
  showSuccess: false,
  showError: false,

  init() {
    this._super(...arguments);

    if (this.isFastBoot) {
      return false;
    }

    const lead = this.store.createRecord('lead', {
      // name: 'Jan Werkhoven',
      // company: 'Interflux Electronics',
      // email: 'jw@interflux.com',
      // mobile: '+61424787652',
      // message: 'Hello Interflux, can you send me your best expert.',
      // purpose: 'Request LMPA demo',
      source: window.location.href
    });

    this.set('lead', lead);
    this.fetchData.perform();
  },

  // Fetch all countries and meta data for the visitor's IP.
  // From the IP meta data we can extract the country of our visitor and
  // pre-populate the country dropdown.
  fetchData: task(function*() {
    const tasks = [];
    tasks.push(this.fetchCountries.perform());
    tasks.push(this.fetchIpMeta.perform());
    yield all(tasks);

    const { countryCode, region, city, query } = this.ipMeta;

    const countryRecord = this.countries.findBy('countryCode', countryCode);

    this.lead.setProperties({
      // TODO: Move higher country: countryRecord,
      ipCountry: countryRecord,
      ipRegion: region,
      ipCity: city,
      ip: query
    });

    yield timeout(1);
  }),

  // To populate the country dropdown we fetch all countries on init().
  fetchCountries: task(function*() {
    const countries = yield this.store.findAll('country');
    this.set('countries', countries);
  }),

  // To figure out which country the visitor is from we can ping their IP to a
  // service which returns the IP meta data in JSON format, including the country.
  // https://medium.com/@adeyinkaadegbenro/how-to-detect-the-location-of-your-websites-visitor-using-javascript-92f9e91c095f
  // http://ip-api.com/json
  fetchIpMeta: task(function*() {
    const response = yield fetch('http://ip-api.com/json');
    const json = yield response.json();
    this.set('ipMeta', json);
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
