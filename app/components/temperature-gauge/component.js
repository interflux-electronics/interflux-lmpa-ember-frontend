import Ember from 'ember';

const { observer, run } = Ember;

const limitsMap = {
  wave: {
    lmpa: [200, 230],
    sac: [260, 280]
  },
  selective: {
    lmpa: [200, 250],
    sac: [270, 320]
  },
  reflow: {
    lmpa: [190, 220],
    sac: [235, 250]
  }
};

let timer = {
  lmpa: null,
  sac: null
};

export default Ember.Component.extend({
  elementId: 'temperature-guage',
  process: 'selective',

  // Return random number between 0 and 1 with a normal distribution
  random() {
    return (1 + ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3) / 2;
  },

  animateArrow(alloy, intro) {
    const self = this;
    const process = this.get('process');
    const limits = limitsMap[process][alloy];
    const min = limits[0];
    const max = limits[1];
    const range = max - min;
    const random = this.random();
    // const temperature = min + (range / 4) + (random * (range / 2));
    const temperature = min + (range * 0.166) + (random * (range * 0.666));
    const degrees = (temperature * ((2 * 108) / 350)) - 108;
    const duration = 1000 + (random * 1400);
    const $lmpa = this.$(`#arrow-${alloy}>g`);
    if (intro) {
      $lmpa.stop('velocity').velocity({
        rotateZ: [`${degrees}deg`, -108]
      }, {
        duration: 5000,
        easing: 'easeInOut'
      });
    } else {
      $lmpa.stop('velocity').velocity({
        rotateZ: `${degrees}deg`
      }, {
        duration: duration,
        easing: 'easeInOut'
      });
    }
    const delay = intro ? 7200 : duration * 1.1;
    timer[alloy] = run.later(self, function() {
      self.animateArrow(alloy);
    }, delay);
  },

  actions: {
    setProcess(process) {
      this.set('process', process);
    }
  },

  didInsertElement: function() {
    this.animateArrow('lmpa', true);
    this.animateArrow('sac', true);
  }

});
