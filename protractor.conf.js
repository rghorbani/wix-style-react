module.exports.config = {
  specs: ['test/**/*.e2e.js', 'src/**/*.e2e.js'],
  baseUrl: `http://localhost:6006/`,
  troubleshoot: true,
  debug: true,
  maxInstances: 3,
  capabilities: {
    browserName: 'chrome',

    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=800,600']
    },
    maxInstances: 3
  },
  onPrepare() {
    browser.ignoreSynchronization = true;
  }
};
