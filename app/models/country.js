import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

export default Model.extend({
  // Attributes
  name: attr('string'),
  nativeName: attr('string'),
  countryCode: attr('string'),
  population: attr('number'),

  // Returns the English and native country name in the format: "Belgium (België)"
  localAndNativeName: computed('name', 'nativeName', function() {
    if (this.name === this.nativeName) {
      return this.name;
    }
    return `${this.name} (${this.nativeName})`;
  })
});
