const { assert } = QUnit;
import { currentURL } from '@ember/test-helpers';

export default function(url) {
  assert.equal(currentURL(), url, `the URL matches ${url}`);
}
