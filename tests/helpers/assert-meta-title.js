/**
 * Checks if the <head> has the correct <title>
 * @param {String} title - the expected title
 */

const { assert } = QUnit;

export default function(cxt, title) {
  // Assert the title against the head data service instead of the title tag directly, because of this issue/discussion
  // https://github.com/testem/testem/issues/195
  const serviceTitle = cxt.owner.lookup('service:head-data').title;
  assert.equal(serviceTitle, title, `The <title> is correctly set to ${title}`);
}
