import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { setProperties } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: 'form',
  elementId: 'contact-form',

  store: service(),

  // Records created on init()
  company: undefined,
  person: undefined,
  message: undefined,

  // Fetched on init();
  countries: undefined,

  init() {
    this._super(...arguments);

    const company = this.store.createRecord('company');
    const person = this.store.createRecord('person', { company });
    const message = this.store.createRecord('message', { person });

    setProperties(this, {
      company,
      person,
      message
    });

    this.fetchCountries.perform();
  },

  fetchCountries: task(function*() {
    const countries = yield this.store.findAll('country');
    this.set('countries', countries);
  }),
  //
  // saveProduct: task(function*() {
  //   const isValid = yield this.validateForm.perform();
  //   if (!isValid) {
  //     return;
  //   }
  //   const success = product => {
  //     this.router.transitionTo('products.product', product.slug);
  //   };
  //   const fail = response => {
  //     if (response.errors.length) {
  //       const error = response.errors[0];
  //       set(this, 'errorCode', 'unknown');
  //       console.error(error.title);
  //       console.error(error.detail);
  //     } else {
  //       const payload = response.payload;
  //       const errorCode = payload ? payload.errors[0].code : 'unknown';
  //       set(this, 'errorCode', errorCode);
  //       console.error(errorCode);
  //     }
  //   };
  //   set(this, 'errorCode', null);
  //   const product = this.product;
  //   yield product.save().then(success, fail);
  // }).drop(),
  //
  // validateForm: task(function*() {
  //   // yield this.validate();
  //   // return get(this, 'validations.isValid');
  //   yield this.product.validate();
  //   return this.product.validations.isValid;
  // }),

  actions: {
    focusOnNextField() {
      //
    }
  }
});
