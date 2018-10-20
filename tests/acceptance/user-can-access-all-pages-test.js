import { module, test } from 'qunit';
import { visit, currentURL, find, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | user can access all pages', function(hooks) {
  setupApplicationTest(hooks);

  test('the "/" route should redirect', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/en/low-melting-point-alloys');
    assert.ok(find('main#intro'));
  });

  test('the "/unknown" route should redirect', async function(assert) {
    await visit('/unknown');
    assert.equal(currentURL(), '/en/low-melting-point-alloys');
    assert.ok(find('main#intro'));
  });

  test('the "/en" route should redirect', async function(assert) {
    await visit('/en');
    assert.equal(currentURL(), '/en/low-melting-point-alloys');
    assert.ok(find('main#intro'));
  });

  test('the "/en/unknown" route should redirect', async function(assert) {
    await visit('/en/unknown');
    assert.equal(currentURL(), '/en/low-melting-point-alloys');
    assert.ok(find('main#intro'));
  });

  test('the user can visit all pages using the next button', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/en/low-melting-point-alloys');
    assert.equal(find('main').id, 'intro');

    await click('[data-test-next]');
    assert.equal(currentURL(), '/en/low-melting-point-soldering-alloys');
    assert.equal(find('main').id, 'overview');

    await click('[data-test-next]');
    assert.equal(
      currentURL(),
      '/en/fast-selective-soldering-with-zero-defects'
    );
    assert.equal(find('main').id, 'speed');

    await click('[data-test-next]');
    assert.equal(currentURL(), '/en/drastically-reduce-solder-voiding');
    assert.equal(find('main').id, 'voiding');

    await click('[data-test-next]');
    assert.equal(
      currentURL(),
      '/en/reduce-production-costs-and-increase-capacity'
    );
    assert.equal(find('main').id, 'costs');

    await click('[data-test-next]');
    assert.equal(currentURL(), '/en/avoid-heat-related-solder-failures');
    assert.equal(find('main').id, 'heat-failures');

    await click('[data-test-next]');
    assert.equal(
      currentURL(),
      '/en/reduce-dross-formation-when-wave-soldering'
    );
    assert.equal(find('main').id, 'dross');

    await click('[data-test-next]');
    assert.equal(currentURL(), '/en/excellent-wetting');
    assert.equal(find('main').id, 'wetting');

    await click('[data-test-next]');
    assert.equal(currentURL(), '/en/developed-by-interflux-electronics');
    assert.equal(find('main').id, 'interflux');

    await click('[data-test-next]');
    assert.equal(currentURL(), '/en/request-free-demo');
    assert.equal(find('main').id, 'contact');

    await click('[data-test-next]');
    assert.equal(currentURL(), '/en/low-melting-point-alloys');
    assert.equal(find('main').id, 'intro');
  });
});
