/*eslint-env node*/

const FastBootAppServer = require('fastboot-app-server');
const FastBootWatchNotifier = require('fastboot-watch-notifier');

const distPath = 'current/dist';

const notifier = new FastBootWatchNotifier({
  distPath: 'current/dist',
  debounceDelay: 250,
  saneOptions: {
    poll: true
  }
});

const server = new FastBootAppServer({
  distPath,
  notifier,
  gzip: true,
  host: '127.0.0.1',
  port: 8000
});

server.start();
