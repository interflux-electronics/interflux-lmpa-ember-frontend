import Component from '@ember/component';

export default Component.extend({
  elementId: 'app-wrapper',

  // Structured data for SEO
  attributeBindings: ['itemscope', 'itemtype'],
  itemscope: '',
  itemtype: 'https://schema.org/Organization'
});
