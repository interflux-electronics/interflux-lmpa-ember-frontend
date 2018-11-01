/**
 * Checks if the <head> has the correct <meta name="robots">
 * @param {String} robot - the expected robot instructions
 */

const { assert } = QUnit;
import { find } from '@ember/test-helpers';
import cleanString from 'app/tests/helpers/clean-string';

export default function(obj) {
  assertDirectProperties(obj);
}

function assertDirectProperties(obj) {
  const type = obj.type;
  Object.keys(obj).forEach(key => {
    const value = obj[key];

    // Nested structures
    if (typeof value === 'object') {
      return assertDirectProperties(value);
    }

    // Direct properties
    if (typeof value === 'string') {
      if (key === 'type') {
        assert.ok(
          find(`[itemscope][itemtype="https://schema.org/${value}"]`),
          `Has element with itemscope: ${type}`
        );
      } else {
        const element = find(
          `[itemscope][itemtype="https://schema.org/${type}"] [itemprop="${key}"]`
        );
        let content = 'unknown';
        if (element.tagName === 'META') {
          content = element.content;
        } else if (key === 'url') {
          content = element.href.replace(/\/$/, '');
        } else if (key === 'logo') {
          content = element.src;
          return assert.ok(
            content.endsWith(value),
            `Itemscope ${type} has ${key} = ${value}`
          );
        } else {
          content = cleanString(element.innerText);
        }
        assert.equal(content, value, `Itemscope ${type} has ${key} = ${value}`);
      }
    }
  });
}
