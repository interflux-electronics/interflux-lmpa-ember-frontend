import Component from '@ember/component';
import config from 'ember-get-config';
import { task, waitForEvent } from 'ember-concurrency';
import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';

const { isTest } = config.buildConfig;

export default Component.extend({
  tagName: 'main',
  elementId: 'costs',

  fastboot: service(),
  isFastBoot: readOnly('fastboot.isFastBoot'),

  didInsertElement() {
    this._super(...arguments);
    this.listenForScrolls.perform();
  },

  listenForScrolls: task(function*() {
    // Don't listen for scroll events in Fastboot nor test environment
    if (this.isFastBoot || isTest) {
      return;
    }

    const page = this.element;

    const sections = [
      {
        id: 'electricity',
        drop: '-20%',
        animated: false
      },
      {
        id: 'oxides',
        drop: '-95%',
        animated: false
      },
      {
        id: 'nitrogen',
        drop: '-100%',
        animated: false
      },
      {
        id: 'silver',
        drop: '-40%',
        animated: false
      }
    ];

    let keepWatching = true;

    while (keepWatching) {
      yield waitForEvent(window, 'scroll');

      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const windowTop = Math.round(scrollTop + windowHeight * 0.1);
      const windowBottom = Math.round(scrollTop + windowHeight * 0.5);

      const toAnimate = sections.filter(section => section.animated === false);

      if (!toAnimate.length) {
        keepWatching = false;
      }

      toAnimate.forEach(section => {
        const graph = page.querySelector(`#${section.id} .graph`);
        const elementHeight = graph.clientHeight || graph.offsetHeight;
        const elementTop = graph.parentElement.offsetTop;
        const elementBottom = elementTop + elementHeight;
        const isInView = elementTop < windowBottom && elementBottom > windowTop;

        if (isInView) {
          const fill1 = graph.querySelector('.lmpa .fill');
          const fill2 = graph.querySelector('.counter .fill');
          const label = graph.querySelector('.counter span span');

          anime({
            targets: [fill1, fill2],
            translateX: section.drop,
            duration: 1800,
            easing: 'easeInOutQuart',
            update: function(anim) {
              if (label) {
                label.innerText = Math.round(anim.progress) + '%';
              }
            }
          });

          section.animated = true;
        }
      });
    }
  }).restartable()
});
