import ButtonBase from '../button-base/component';
import { get } from '@ember/object';
import { readOnly, notEmpty } from '@ember/object/computed';

export default ButtonBase.extend({
  tagName: 'button',
  classNames: ['button-task'],
  classNameBindings: [
    'isRunning:busy:idle',
    'showError:show-error:no-errors',
    'style'
  ],
  attributeBindings: ['tabindex', 'disabled'],
  tabindex: 1,
  disabled: false,

  // Show loading state
  isRunning: readOnly('task.isRunning'),

  // Show task error
  showError: notEmpty('error'),
  error: readOnly('errors.firstObject'),
  errors: [],

  // Perform the task passed in
  click() {
    get(this, 'onClick')();
  }
});
