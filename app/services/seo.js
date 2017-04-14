import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({

  setRobotMeta(shouldIndex, shouldFollow) {

    // Unless production, always set to false
    if (config.environment !== 'production') {
      shouldIndex = false;
      shouldFollow = false;
    }

    // Set robot metatag in the <head>
    const index = shouldIndex === false ? 'noindex' : 'index';
    const follow = shouldFollow === false ? 'nofollow' : 'follow';
    Ember.$('meta[name=robots]').attr('content', `${index}, ${follow}`);

  }

});
