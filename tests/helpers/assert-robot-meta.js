/**
 * Checks if the <head> has the correct <meta name="robots">
 * @param {String} robot - the expected robot instructions
 */

const { assert } = QUnit;

export default function(robot) {
  assert.equal(
    document.querySelector('meta[name=robots]').content,
    robot,
    `the <meta name="robots"> is correctly set to "${robot}"`
  );
}
