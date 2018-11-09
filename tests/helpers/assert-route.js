/**
 * Test helper which asserts the current route matches the expected route.
 * Most Bookings routes redirect to their parent route parents on error,
 * thus making it relevant to always assert the route after each `await visit()`.
 * @param {String} route - The route expected to be the current route
 * @example
 * import assertModal from 'app/tests/helpers/assert-route';
 * import { visit } from 'ember-native-dom-helpers';
 * await visit(clinicPage.url);
 * assertRoute(clinicPage.route);
 */

const { assert } = QUnit;
import { currentRouteName } from '@ember/test-helpers';

export default function(route, message) {
  const defaultMessage = `the current route is "${route}", it did not redirect`;
  assert.equal(currentRouteName(), route, message || defaultMessage);
}
