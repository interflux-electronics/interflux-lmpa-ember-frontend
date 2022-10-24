import { helper } from '@ember/component/helper';
import ENV from 'interflux-lmpa/config/environment';

export default helper(function env() {
  return ENV['cdnHost'];
});
