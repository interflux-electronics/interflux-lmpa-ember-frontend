import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
  classNames: ['button-link button-base'],
  classNameBindings: ['type']
});
