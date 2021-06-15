const nock = require('nock');
const fetch = require('node-fetch');

/* GLOBAL VARIABLES */
global.nock = nock;
global.fetch = fetch;

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
  publicRuntimeConfig: {},
}));
