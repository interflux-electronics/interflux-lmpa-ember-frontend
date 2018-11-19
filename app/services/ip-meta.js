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
    const response = yield fetch(
      'https://api.ipgeolocation.io/ipgeo?apiKey=d83f07d037b240d3bea34d12b9dfa2ac'
    );

    // It could be that the request fails
    if (!response) {
      return;
    }

    const data = yield response.json();

    // In case of an error, no IP would be send back
    //
    // Success looks like:
    // {
    //   "ip": "115.70.118.70",
    //   "continent_code": "OC",
    //   "continent_name": "Oceania",
    //   "country_code2": "AU",
    //   "country_code3": "AUS",
    //   "country_name": "Australia",
    //   "country_capital": "Canberra",
    //   "state_prov": "New South Wales",
    //   "district": "5",
    //   "city": "North Sydney",
    //   "zipcode": "2055",
    //   "latitude": "-33.8388",
    //   "longitude": "151.209",
    //   "is_eu": false,
    //   "calling_code": "+61",
    //   "country_tld": ".au",
    //   "languages": "en-AU",
    //   "country_flag": "https://ipgeolocation.io/static/flags/au_64.png",
    //   "isp": "EXETEL-Broadband",
    //   "connection_type": "",
    //   "organization": "",
    //   "geoname_id": "2154855",
    //   "currency": {
    //     "name": "Australian Dollar",
    //     "code": "AUD"
    //   },
    //   "time_zone": {
    //     "name": "Australia/Sydney",
    //     "offset": 10,
    //     "current_time": "2018-11-19 17:20:14.357+1100",
    //     "current_time_unix": 1542608414.357,
    //     "is_dst": true,
    //     "dst_savings": 1
    //   }
    // }
    //
    // Errors look like:
    // {"status":401,"message":"You're not authorized to use IP Geolocation API"}
    //
    if (!data.ip) {
      return;
    }

    this.set('data', data);

    // Store in session storage for when page is refreshed, no new request needed.
    const str = JSON.stringify(data);
    const base64 = btoa(str);
    sessionStorage.setItem('ip-meta', base64);
  })
});
