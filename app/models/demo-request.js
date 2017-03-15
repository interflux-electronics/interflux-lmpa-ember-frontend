import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  name: attr('string'),
  company: attr('string'),
  email: attr('string'),
  phone: attr('string'),
  country: attr('string')
});
