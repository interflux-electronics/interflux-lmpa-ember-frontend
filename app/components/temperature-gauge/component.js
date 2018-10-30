import Component from '@ember/component';
import config from 'ember-get-config';
import { observer } from '@ember/object';
import { run } from '@ember/runloop';
import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';

const { isTest } = config.buildConfig;

const limits = {
  wave: {
    label: 'Wave Soldering',
    lmpa: [200, 230],
    sac: [260, 280]
  },
  selective: {
    label: 'Selective Soldering',
    lmpa: [200, 250],
    sac: [270, 320]
  },
  reflow: {
    label: 'Reflow Soldering',
    lmpa: [190, 220],
    sac: [235, 250]
  }
};

const timer = {
  lmpa: null,
  sac: null
};

export default Component.extend({
  elementId: 'temperature-gauge',
  classNameBindings: ['process'],

  fastboot: service(),
  isFastBoot: readOnly('fastboot.isFastBoot'),

  limits,
  timer,

  process: 'wave',
  current: null,
  label: null,
  minTempLMPA: null,
  maxTempLMPA: null,
  minTempSAC: null,
  maxTempSAC: null,

  init: function() {
    this._super(...arguments);
    this.setValues();
  },

  observeProcess: observer('process', function() {
    run.cancel(this.timer.lmpa);
    run.cancel(this.timer.sac);
    this.setValues();
    this.animateArrow('lmpa');
    this.animateArrow('sac');
  }),

  setValues() {
    const current = this.limits[this.process];
    this.set('label', current.label);
    this.set('minTempLMPA', current.lmpa[0]);
    this.set('maxTempLMPA', current.lmpa[1]);
    this.set('minTempSAC', current.sac[0]);
    this.set('maxTempSAC', current.sac[1]);
  },

  // Return random number between 0 and 1 with a normal distribution
  random() {
    return (
      (1 +
        (Math.random() +
          Math.random() +
          Math.random() +
          Math.random() +
          Math.random() +
          Math.random() -
          3) /
          3) /
      2
    );
  },

  animateArrow(alloy, intro) {
    // Don't listen for scroll events in Fastboot nor test environment
    if (this.isFastBoot || isTest) {
      return;
    }

    // Compute a random temperature with bounds of wave / soldering / reflow
    const process = this.process;
    const limits = this.limits[process][alloy];
    const min = limits[0];
    const max = limits[1];
    const range = max - min;
    const random = this.random();
    const temperature = min + range * random;
    const degrees = temperature * ((2 * 108) / 350) - 108;

    // Define animation params
    const targets = this.element.querySelector(`#arrow-${alloy}>g`);
    const rotateZ = intro ? ['-108deg', `${degrees}deg`] : `${degrees}deg`;
    const duration = intro ? 6000 : 2000 + random * 1400;
    const easing = 'easeInOutQuart';

    // Animate the arrow
    anime({
      targets,
      rotateZ,
      duration,
      easing
    });

    // Loop
    const self = this;
    const delay = intro ? 5100 : duration * 1.1;
    this.timer[alloy] = run.later(
      self,
      function() {
        self.animateArrow(alloy);
      },
      delay
    );
  },

  actions: {
    setProcess(process) {
      this.set('process', process);
    }
  },

  didInsertElement: function() {
    this.animateArrow('lmpa', true);
    this.animateArrow('sac', true);
  },

  willDestroy() {
    run.cancel(this.timer.lmpa);
    run.cancel(this.timer.sac);
  }
});
