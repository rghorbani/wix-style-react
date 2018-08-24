module.exports.config = {
  specs: ['test/**/*.e2e.js', 'src/**/*.e2e.js'],
  baseUrl: `http://localhost:6006/`,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu']
    },
    maxInstances: 3
  },
  onPrepare() {
    browser.ignoreSynchronization = true;
  }
};
