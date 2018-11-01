/**
 * Returns the passed string without leading and trailing spaces, without double spaces, without line-breaks.
 * Do note, having to use cleanString() in your tests is likely an indication your test doesn't have precise selectors/
 * @param {String} string
 */

export default function(string) {
  return string
    .trim()
    .replace(/\r\n|\n|\r/gm, '')
    .replace(/ +(?= )/gm, ''); // Note: don't merge these 2 regexes for best result
}
