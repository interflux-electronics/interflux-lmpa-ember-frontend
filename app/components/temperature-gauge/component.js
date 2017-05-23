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

export default Ember.Component.extend({
  classNames: ['temperature-guage'],

  observeProcess: observer('process', function() {
    this.animateArrow('lmpa');
    // this.animateArrow('sac');
  }),

  randomBM() {
    return (1 + ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3) / 2;
  },

  // animateArrow(type) {
  //   const process = this.get('process');
  //   const limits = limitsMap[process][type];
  //   const min = limits[0];
  //   const max = limits[1];
  //   const range = max - min;
  //   const random = this.randomBM();
  //   const temperature = min + (random * range);
  //   const degrees = (temperature * ((2 * 108) / 350)) - 108;
  //   const $lmpa = this.$(`#arrow-${type}>g`);
  //   $lmpa.stop('velocity').velocity({
  //     rotateZ: `${degrees}deg`
  //   }, {
  //     duration: 2000,
  //     easing: 'easeOutExpo'
  //   });
  //   const self = this;
  //   run.later(self, function() {
  //     self.animateArrow(type);
  //   }, 2100);
  // },

  animateArrow(type) {
    const process = this.get('process');
    const limits = limitsMap[process][type];
    const min = limits[0];
    const max = limits[1];
    const range = max - min;
    const random = this.randomBM();
    const temperature = min + (range / 4) + (random * (range / 2));
    const degrees = (temperature * ((2 * 108) / 350)) - 108;
    const duration = 1000 + (random * 2000);
    const $lmpa = this.$(`#arrow-${type}>g`);
    console.log(`${type} ${degrees}`);
    $lmpa.stop('velocity').velocity({
      rotateZ: `${degrees}deg`
    }, {
      duration: duration,
      easing: 'easeInOut'
    });
    const self = this;
    run.later(self, function() {
      self.animateArrow(type);
    }, duration * 1.1);
  },

  didInsertElement: function() {
    // this.moveArrows();
    // this.animateArrow('lmpa', 1);
    // this.animateArrow('sac', 1);
  }
});
