import Component from '@ember/component';
import { and, not, readOnly, notEmpty } from '@ember/object/computed';

const NOOP = () => {};

export default Component.extend({
  classNames: ['form-field'],

  classNameBindings: [
    'hasFocus:has-focus:is-blurred',
    'hasError:has-error:no-error',
    'showError:show-error:hide-error'
  ],

  hasFocus: false,
  isBlurred: not('hasFocus'),
  isLoading: false,

  errors: [],
  error: readOnly('errors.firstObject'),
  hasError: notEmpty('error'),
  shouldError: true,
  showError: and('hasError', 'shouldError'),

  onUpdate: NOOP,
  onEnter: NOOP,
  onFocusIn: NOOP,
  onFocusOut: NOOP
});
