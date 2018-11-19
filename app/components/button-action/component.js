import ButtonBase from '../button-base/component';

export default ButtonBase.extend({
  classNames: ['button-action'],

  // Passed in
  onClick: undefined,
  text: undefined,
  icon: undefined,

  // Perform the action passed in
  click() {
    this.onClick();
  }
});
