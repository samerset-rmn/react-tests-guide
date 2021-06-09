const nock = require('nock');

/* GLOBAL VARIABLES */
global.nock = nock;

/* INTERCEPTOR SERVER SETUP */
beforeEach(() => !nock.isActive() && nock.activate());
afterEach(() => nock.restore());

/* MOCK FUNCTIONS */
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}));
