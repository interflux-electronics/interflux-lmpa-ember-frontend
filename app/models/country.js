import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

export default Model.extend({
  name: attr('string'),
  nativeName: attr('string'),
  countryCode: attr('string'),
  population: attr('number'),
  languages: attr('string'),
  timezones: attr('string'),
  callingCodes: attr('string'),

  searchString: computed('name', 'nativeName', function() {
    if (this.name === this.nativeName) {
      return this.name;
    }
    return `${this.name} - ${this.nativeName}`;
  })
});
