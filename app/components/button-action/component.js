import ButtonBase from '../button-base/component';
import { get } from '@ember/object';

export default ButtonBase.extend({
  tagName: 'button',
  classNames: ['button-action'],

  // Perform the action passed in
  click() {
    get(this, 'onClick')();
  }
});
