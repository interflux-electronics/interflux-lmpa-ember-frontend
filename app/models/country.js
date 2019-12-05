import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

export default Model.extend({
  // Attributes
  nameEnglish: attr('string'),
  nameNative: attr('string'),

  population: attr('number'),
  area: attr('number'),

  numericCode: attr('string'),
  twoLetterCode: attr('string'),
  threeLetterCode: attr('string'),

  // Returns the English and native country name in the format: "Belgium (België)"
  localAndNativeName: computed('nameEnglish', 'nameNative', function() {
    if (this.nameEnglish === this.nameNative) {
      return this.nameEnglish;
    }
    return `${this.nameEnglish} (${this.nameNative})`;
  })
});
