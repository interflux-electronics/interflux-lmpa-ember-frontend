// This service is responsible for fetching and storing the user's IP its meta
// data such as the country of origin.
//
// Documentation:
// https://medium.com/@adeyinkaadegbenro/how-to-detect-the-location-of-your-websites-visitor-using-javascript-92f9e91c095f
// http://ip-api.com/json

import Service from '@ember/service';
import fetch from 'fetch';
import { task, timeout } from 'ember-concurrency';
import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Service.extend({
  fastboot: service(),
  isFastBoot: readOnly('fastboot.isFastBoot'),

  data: undefined,

  fetch() {
    if (this.isFastBoot) {
      return;
    }

    // First check if IP meta data was stored in session storage.
    const base64 = sessionStorage.getItem('ip-meta');
    const str = base64 ? atob(base64) : undefined;
    const obj = str ? JSON.parse(str) : undefined;
    if (obj) {
      return this.set('data', obj);
    }

    // If not found in session storage, then fire AJAX request to fetch.
    this.fetchIpMetaData.perform();
  },

  // Fetch the IP meta data
  fetchIpMetaData: task(function*() {
    // Timeout to make sure it's done in the next life cycle
    yield timeout(1);

    // AJAX request
    const response = yield fetch('http://ip-api.com/json');
    const data = yield response.json();
    this.set('data', data);

    // Store in session storage for when page is refreshed, no new request needed.
    const str = JSON.stringify(data);
    const base64 = btoa(str);
    sessionStorage.setItem('ip-meta', base64);
  })
});
