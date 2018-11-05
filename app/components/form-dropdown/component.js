import FormFieldComponent from '../form-field/component';

export default FormFieldComponent.extend({
  classNames: ['form-dropdown'],

  actions: {
    selectItem(selection) {
      this.onUpdate(selection);
    },
    hideError() {
      // console.log("hide error");
    }
  }
});
