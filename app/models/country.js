import Model from 'ember-data/model';
import attr from 'ember-data/attr';

// #  id                :uuid             not null, primary key
// #  name              :string
// #  native_name       :string
// #  region            :string
// #  subregion         :string
// #  alpha_2_code      :string
// #  alpha_3_code      :string
// #  numeric_code      :string
// #  flag              :string
// #  latlng            :string
// #  area              :decimal(, )
// #  population        :decimal(, )
// #  languages         :string
// #  timezones         :string
// #  currencies        :string
// #  top_level_domains :string
// #  calling_codes     :string
// #  created_at        :datetime         not null
// #  updated_at        :datetime         not null

export default Model.extend({
  // Attributes
  name: attr('string'),
  nativeName: attr('string'),
  region: attr('string'),
  subregion: attr('string'),
  languages: attr('string'),
  timezones: attr('string'),
  callingCodes: attr('string')
});
