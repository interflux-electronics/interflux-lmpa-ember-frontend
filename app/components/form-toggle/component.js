import FormFieldComponent from '../form-field/component';
import { get } from '@ember/object';

const NOOP = () => {};

export default FormFieldComponent.extend({
  tagName: 'button',
  classNames: ['form-toggle'],
  classNameBindings: ['checked:checked:unchecked'],
  checked: false,

  onUpdate: NOOP,

  click() {
    const newValue = !get(this, 'checked');
    get(this, 'onUpdate')(newValue);
  }
});
