import Route from '@ember/routing/route';
import config from 'ember-get-config';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

const { isTesting } = config;

export function initialize() {
  Route.reopen({
    fastboot: service(),
    isFastBoot: readOnly('fastboot.isFastBoot'),

    activate() {
      this._super();
      // Avoid resetting scroll in Fastboot and tests
      if (this.isFastBoot || isTesting) {
        return;
      }
      window.scrollTo(0, 0);
    }
  });
}

export default {
  initialize
};
