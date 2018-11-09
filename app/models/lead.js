import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  company: attr('string'),
  email: attr('string'),
  mobile: attr('string'),
  message: attr('string'),
  purpose: attr('string'),
  source: attr('string'),
  ip: attr('string'),
  country: belongsTo('country'),
  ipCountry: belongsTo('country'),
  ipRegion: attr('string'),
  ipCity: attr('string')
});
