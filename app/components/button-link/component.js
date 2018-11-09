import ButtonBase from '../button-base/component';
import { hrefTo } from 'ember-href-to/helpers/href-to';
import { computed } from '@ember/object';

export default ButtonBase.extend({
  tagName: 'a',
  classNames: ['button-link'],
  attributeBindings: ['href'],

  // Passed in
  route: undefined,
  text: undefined,
  icon: undefined,

  // Return the URL matching the route
  href: computed('route', function() {
    return hrefTo(this, this.route);
  })
});
