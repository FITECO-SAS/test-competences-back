const config = require('./jest.config');

config.testRegex = '\\.it\\.spec\\.ts$';

config.transform = {
  '^.+\\.ts?$': ['ts-jest', {
    diagnostics: false,
  }],
};

module.exports = config;
