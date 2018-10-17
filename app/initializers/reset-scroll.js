import Route from '@ember/routing/route';
// import config from 'ember-get-config';
import { inject as service } from '@ember/service';

// const testing = config.buildConfig.isTest;

export function initialize() {
  Route.reopen({
    fastboot: service()

    // activate() {
    //   this._super();
    //   // In Fastboot the window global does not exist and breaks
    //   if (this.isFastBoot || testing) {
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // }
  });
}

export default {
  initialize
};
