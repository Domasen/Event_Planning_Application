const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:49440';

const context =  [
    "/User/login", "/User/register", "/User/currentUser", "/User/logout", "/swagger", "/Event/createEvent",
    "/EventType/getEventTypes", "/EventCategory/getEventCategories"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    proxyTimeout: 10000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive',
      //accept: '*/*'
    }
  });

  app.use(appProxy);
};
