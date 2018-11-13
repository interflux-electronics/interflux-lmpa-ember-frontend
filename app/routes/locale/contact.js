import Route from '@ember/routing/route';
// import RSVP from 'rsvp';
// import { readOnly } from '@ember/object/computed';
// import { inject as service } from '@ember/service';

export default Route.extend({
  metaTitle: `Contact - Interflux`,
  metaDescription: `Contact Interflux for more information about LMPA and LMPA-Q.`,
  metaCanonical: 'https://lmpa.interflux.com/en/request-free-demo',

  // fastboot: service(),
  // isFastBoot: readOnly('fastboot.isFastBoot'),

  model() {
    // if (this.isFastBoot) {
    //   return {};
    // }
    // return RSVP.hash({
    //   categories: this.store.findAll('country')
    // });
  }
});
