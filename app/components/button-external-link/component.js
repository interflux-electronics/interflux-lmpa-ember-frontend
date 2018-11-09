import ButtonBase from '../button-base/component';

export default ButtonBase.extend({
  tagName: 'a',
  classNames: ['button-external-link'],
  attributeBindings: ['href', 'target', 'rel'],

  // Passed in
  href: undefined,
  text: undefined,
  icon: undefined,

  // To avoid current page being lost, always open in external window
  target: '_blank',

  // For security, always add this to external links
  // https://developers.google.com/web/tools/lighthouse/audits/noopener
  rel: 'noopener'
});
