/**
 * Checks if the <head> has the correct <title>
 * @param {String} title - the expected title
 */

const { assert } = QUnit;

export default function(title) {
  assert.equal(
    document.title,
    title,
    `The <title> is correctly set to ${title}`
  );
}
