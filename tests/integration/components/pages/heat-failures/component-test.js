import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pages/heat-failures', 'Integration | Component | pages/heat failures', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pages/heat-failures}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pages/heat-failures}}
      template block text
    {{/pages/heat-failures}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
