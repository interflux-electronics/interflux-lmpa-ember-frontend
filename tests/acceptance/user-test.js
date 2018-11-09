import { module, test } from 'qunit';
import { visit, find, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import assertPath from 'app/tests/helpers/assert-path';

module('Acceptance | Users can click to all pages', function(hooks) {
  setupApplicationTest(hooks);

  test('the "/" route should redirect', async function(assert) {
    await visit('/');
    assertPath('/en/low-melting-point-alloys');
    assert.ok(find('#intro-page'));
  });

  test('the "/unknown" route should redirect', async function(assert) {
    await visit('/unknown');
    assertPath('/en/low-melting-point-alloys');
    assert.ok(find('#intro-page'));
  });

  test('the "/en" route should redirect', async function(assert) {
    await visit('/en');
    assertPath('/en/low-melting-point-alloys');
    assert.ok(find('#intro-page'));
  });

  test('the "/en/unknown" route should redirect', async function(assert) {
    await visit('/en/unknown');
    assertPath('/en/low-melting-point-alloys');
    assert.ok(find('#intro-page'));
  });

  test('the user can visit all pages using the next button', async function(assert) {
    await visit('/');
    assertPath('/en/low-melting-point-alloys');
    assert.equal(find('main').id, 'intro-page');

    await click('[data-test-next]');
    assertPath('/en/low-melting-point-soldering-alloys');
    assert.equal(find('main').id, 'overview-page');

    await click('[data-test-next]');
    assertPath('/en/fast-selective-soldering-with-zero-defects');
    assert.equal(find('main').id, 'speed-page');

    await click('[data-test-next]');
    assertPath('/en/drastically-reduce-solder-voiding');
    assert.equal(find('main').id, 'voiding-page');

    await click('[data-test-next]');
    assertPath('/en/reduce-production-costs-and-increase-capacity');
    assert.equal(find('main').id, 'costs-page');

    await click('[data-test-next]');
    assertPath('/en/avoid-heat-related-solder-failures');
    assert.equal(find('main').id, 'heat-failures-page');

    await click('[data-test-next]');
    assertPath('/en/reduce-dross-formation-when-wave-soldering');
    assert.equal(find('main').id, 'dross-page');

    await click('[data-test-next]');
    assertPath('/en/excellent-wetting');
    assert.equal(find('main').id, 'wetting-page');

    await click('[data-test-next]');
    assertPath('/en/developed-by-interflux-electronics');
    assert.equal(find('main').id, 'interflux-page');

    await click('[data-test-next]');
    assertPath('/en/request-free-demo');
    assert.equal(find('main').id, 'contact-page');

    await click('[data-test-next]');
    assertPath('/en/low-melting-point-alloys');
    assert.equal(find('main').id, 'intro-page');
  });
});
