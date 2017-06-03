import Ember from 'ember';

let handler;

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'costs',

  // What to do if user scrolls
  userScrolled(scrollY) {
    this.$('li .graph').not('.animated').each(function(i) {
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).height();
      const windowTop = window.scrollY + (window.innerHeight * 0.2);
      const windowBottom = window.scrollY + (window.innerHeight * 0.8);
      const isInView = elementTop < windowBottom && elementBottom > windowTop;
      if (isInView) {
        $(this).addClass('animated');
        const $fill = $(this).find('.lmpa .fill, .counter .fill');
        const $label = $(this).find('.counter span span');
        const drop = $(this).data('drop');
        $fill.velocity({
          translateX: `-${drop}`,
          tween: [drop, 0]
        }, {
          duration: 1400,
          easing: [.68, .13, .36, .98],
          progress: function(e, p, r, s, tweenValue) {
            $label.html(`${Math.round(tweenValue)}%`);
          }
        });
      }
    });
  },

  didInsertElement() {

    // Add debounced scroll event listener
    const self = this;
    let lastScrollY = 0;
    let ticking = false;

    handler = function(e) {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          self.userScrolled(lastScrollY);
          ticking = false;
        });
      }
      ticking = true;
    }

    window.addEventListener('scroll', handler);

    // Trigger first scroll
    self.userScrolled(window.scrollY);

  },

  willDestroy() {
    window.removeEventListener('scroll', handler, false);
  }
});
