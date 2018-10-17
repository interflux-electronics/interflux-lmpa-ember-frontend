import Ember from 'ember';

let handler;

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'costs',

  // What to do if user scrolls
  userScrolled() {
    this.$('li .graph')
      .not('.animated')
      .each(function() {
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).height();
        const windowTop = window.scrollY + window.innerHeight * 0.2;
        const windowBottom = window.scrollY + window.innerHeight * 0.8;
        const isInView = elementTop < windowBottom && elementBottom > windowTop;
        if (isInView) {
          $(this).addClass('animated');
          const $fill = $(this).find('.lmpa .fill, .counter .fill');
          const $label = $(this).find('.counter span span');
          const drop = $(this).data('drop');
          $fill.velocity(
            {
              translateX: `-${drop}`,
              tween: [drop, 0]
            },
            {
              duration: 1400,
              easing: [0.68, 0.13, 0.36, 0.98],
              progress: function(e, p, r, s, tweenValue) {
                $label.html(`${Math.round(tweenValue)}%`);
              }
            }
          );
        }
      });
  },

  didInsertElement() {
    // Add debounced scroll event listener
    const self = this;
    let lastScrollY = 0;
    let ticking = false;

    handler = function() {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          self.userScrolled(lastScrollY);
          ticking = false;
        });
      }
      ticking = true;
    };

    window.addEventListener('scroll', handler);

    // Trigger first scroll
    self.userScrolled(window.scrollY);
  },

  willDestroy() {
    window.removeEventListener('scroll', handler, false);
  }
});
