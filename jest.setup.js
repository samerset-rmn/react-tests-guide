const nock = require('nock');

/* GLOBAL VARIABLES */
global.nock = nock;

/* INTERCEPTOR SERVER SETUP */
beforeAll(() => nock.disableNetConnect());
beforeEach(() => !nock.isActive() && nock.activate());
afterEach(() => nock.restore());
afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});

/* MOCK FUNCTIONS */
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}));
