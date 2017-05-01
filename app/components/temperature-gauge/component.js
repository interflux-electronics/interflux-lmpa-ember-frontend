import Ember from 'ember';

const { observer } = Ember;

const allLimits = {
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

// Standard Normal variate using Box-Muller transform.
function randn_bm() {
  var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
  var v = 1 - Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export default Ember.Component.extend({
  classNames: ['temperature-guage'],

  observeProcess: observer('process', function() {
    this.moveArrows();
  }),

  randomBM() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  },

  moveArrows() {
    const process = this.get('process');
    const limits = allLimits[process];
    const rangeLMPA = limits.lmpa[1] - limits.lmpa[0];
    const rangeSAC = limits.sac[1] - limits.sac[0];
    // const deviationLMPA = Math.round(((this.randomBM() + 1) / 2) * (rangeLMPA / 2));
    // const deviationSAC = Math.round(((this.randomBM() + 1) / 2) * (rangeSAC / 2));
    // const centreTempLMPA = limits.lmpa[0] + ((this.randomBM() + 1) / 2) * rangeLMPA;
    // const centreTempSAC = limits.sac[0] + ((this.randomBM() + 1) / 2) * rangeLMPA;

    const centreTempLMPA = limits.lmpa[0] + (rangeLMPA / 2);
    const centreTempSAC = limits.sac[0] + (rangeSAC / 2);

    const ratio = (108 + 108) / 350;
    const degreesLMPA = centreTempLMPA * ratio - 108;
    const degreesSAC = centreTempSAC * ratio - 108;

    const $sac = this.$('#arrow-sac>g');
    const $lmpa = this.$('#arrow-lmpa>g');

    const self = this;

    $sac.stop('velocity').velocity({ rotateZ: `${degreesSAC}deg` }, {
      duration: 2000,
      easing: 'easeOutExpo',
      complete: function() {
        // self.moveArrows();
      }
    });

    $lmpa.stop('velocity').velocity({
      rotateZ: `${degreesLMPA}deg`
    }, {
      duration: 2000,
      easing: 'easeOutExpo'
    });
  },

  didInsertElement: function() {
    this.moveArrows();
  }
});
