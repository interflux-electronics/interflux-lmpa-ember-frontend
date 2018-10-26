/*
This initializer binds attributes to {{link-to}} components which we need for
SEO targetted structured data.
 */

import LinkComponent from '@ember/routing/link-component';

export default {
  initialize: function() {
    // Expand {{link-to}} helpers to support itemscope and itemtype attributes
    LinkComponent.reopen({
      attributeBindings: ['itemscope', 'itemtype', 'itemprop']
    });
  }
};
