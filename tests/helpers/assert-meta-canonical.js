/**
 * Checks if the <head> has the correct <link rel="canonical">
 * @param {String} canonical - the expected canonical link
 */

const { assert } = QUnit;

export default function(canonical) {
  assert.equal(
    document.querySelector('link[rel=canonical]').href,
    canonical,
    'The <link rel"canonical"> is correct'
  );
}
