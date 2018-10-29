/**
 * Checks if the <head> has the correct <meta name="description">
 * @param {String} description - the expected description
 */
const { assert } = QUnit;

export default function(description) {
  assert.equal(
    document.querySelector('meta[name=description]').content,
    description,
    'The <meta name="description"> is correct'
  );
}
