const config = require('./jest.config');

config.testRegex = '(?<!.it|e2e).spec.ts$';

module.exports = config;
