import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr('string'),
  nativeName: attr('string'),
  countryCode: attr('string'),
  languages: attr('string'),
  timezones: attr('string'),
  callingCodes: attr('string')
});
