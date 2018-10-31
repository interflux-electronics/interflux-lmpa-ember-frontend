import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import assertRoute from 'app/tests/helpers/assert-route';
import assertMetaTitle from 'app/tests/helpers/assert-meta-title';
import assertMetaDescription from 'app/tests/helpers/assert-meta-description';
import assertMetaCanonical from 'app/tests/helpers/assert-meta-canonical';
import assertRobotMeta from 'app/tests/helpers/assert-robot-meta';

module('Acceptance | Each page is optimised for SEO', function(hooks) {
  setupApplicationTest(hooks);

  test('Intro page', async function() {
    await visit('/en/low-melting-point-alloys');
    assertRoute('locale.intro');
    assertRobotMeta('index, follow');
    assertMetaTitle(this, 'Interlux presents: Low Melting Point Alloys (LMPA)');
    assertMetaDescription(
      `LMPA-Q™ is an enhanced LMPA™ with superior mechanical properties. It's without exception the best alloy we have developed so far. The benefits are numerous.`
    );
    assertMetaCanonical(
      'https://lmpa.interflux.com/en/low-melting-point-alloys'
    );
  });

  test('Overview page', async function() {
    await visit('/en/low-melting-point-soldering-alloys');
    assertRoute('locale.overview');
    assertRobotMeta('index, follow');
    assertMetaTitle(this, 'What are LMPA? - Interflux');
    assertMetaDescription(
      `LMPA™ is short for Low Melting Point Alloys™. These alloys allow you to use soldering temperatures that are considerably lower than for the traditional lead-free Sn(Ag)Cu (SAC) alloys.`
    );
    assertMetaCanonical(
      'https://lmpa.interflux.com/en/low-melting-point-soldering-alloys'
    );
  });

  test('Speed page', async function() {
    await visit('/en/fast-selective-soldering-with-zero-defects');
    assertRoute('locale.speed');
    assertRobotMeta('index, follow');
    assertMetaTitle(this, 'Solder 5 times faster with LMPA - Interflux');
    assertMetaDescription(
      'LMPA™-Q allows for up to 5 times faster production speeds than Sn(Ag)Cu alloys in combination with lower preheat and soldering temperatures. The low oxydation and bridging behaviour of LMPA-Q will facilitate a zero defect process.'
    );
    assertMetaCanonical(
      'https://lmpa.interflux.com/en/fast-selective-soldering-with-zero-defects'
    );
  });

  test('Voiding page', async function() {
    await visit('/en/drastically-reduce-solder-voiding');
    assertRoute('locale.voiding');
    assertRobotMeta('index, follow');
    assertMetaTitle(
      this,
      'How to drastically reduce solder voiding - Interflux'
    );
    assertMetaDescription(
      'With the LMPA™-Q alloy voiding levels can be reduced to between 1% and 10%. For Sn(Ag)Cu-based alloys, voiding levels are typically in between 10% and 35%.'
    );
    assertMetaCanonical(
      'https://lmpa.interflux.com/en/drastically-reduce-solder-voiding'
    );
  });

  test('Costs page', async function() {
    await visit('/en/reduce-production-costs-and-increase-capacity');
    assertRoute('locale.costs');
    assertRobotMeta('index, follow');
    assertMetaTitle(
      this,
      'Reduce soldering production costs by switching to LMPA - Interflux'
    );
    assertMetaDescription(
      'Because of the lower process temperatures, soldering with LMPA-Q will reduce electricity consumption in between 20%-25% compared to Sn(Ag)Cu alloys. With LMPA-Q you will no longer need nitrogen during wave and reflow soldering.'
    );
    assertMetaCanonical(
      'https://lmpa.interflux.com/en/reduce-production-costs-and-increase-capacity'
    );
  });

  test('Heat related failures page', async function() {
    await visit('/en/avoid-heat-related-solder-failures');
    assertRoute('locale.heat-failures');
    assertRobotMeta('index, follow');
    assertMetaTitle(
      this,
      'How to avoid heat related board and component failures - Interflux'
    );
    assertMetaDescription(
      `The LMPA™Q low melting point alloy allows for lower soldering temperatures and virtually eliminates the risk on damage by thermal stress, facilitating the use of temperature sensitive components and PCB board materials.`
    );
    assertMetaCanonical(
      'https://lmpa.interflux.com/en/avoid-heat-related-solder-failures'
    );
  });

  test('Dross page', async function() {
    await visit('/en/reduce-dross-formation-when-wave-soldering');
    assertRoute('locale.dross');
    assertRobotMeta('index, follow');
    assertMetaTitle(this, 'Eliminate dross formation with LMPA - Interflux');
    assertMetaDescription(
      `The LMPA™-Q does not need nitrogen for wave soldering. Due to its low oxydation behaviour, dross formation is reduced to an absolute minimum.`
    );
    assertMetaCanonical(
      'https://lmpa.interflux.com/en/reduce-dross-formation-when-wave-soldering'
    );
  });

  test('Wetting page', async function() {
    await visit('/en/excellent-wetting');
    assertRoute('locale.wetting');
    assertRobotMeta('index, follow');
    assertMetaTitle(this, 'Excellent soldering wetting with LMPA - Interflux');
    assertMetaDescription(
      'The LMPA™-Q alloy gives excellent wetting on all finishings, including OSP.'
    );
    assertMetaCanonical('https://lmpa.interflux.com/en/excellent-wetting');
  });

  test('Interflux page', async function() {
    await visit('/en/developed-by-interflux-electronics');
    assertRoute('locale.interflux');
    assertRobotMeta('index, follow');
    assertMetaTitle(
      this,
      'LMPA was developed with 37 years of experience - Interflux'
    );
    assertMetaDescription(
      `Interflux® Electronics NV has been researching and developing soldering chemistry since 1980. That's 37 years of know-how bundled into the LMPA™.`
    );
    assertMetaCanonical(
      'https://lmpa.interflux.com/en/developed-by-interflux-electronics'
    );
  });

  test('Request demo page', async function() {
    await visit('/en/request-free-demo');
    assertRoute('locale.contact');
    assertRobotMeta('index, follow');
    assertMetaTitle(this, 'Contact - Interflux');
    assertMetaDescription(
      'Contact Interflux for more information about LMPA and LMPA-Q.'
    );
    assertMetaCanonical('https://lmpa.interflux.com/en/request-free-demo');
  });
});
