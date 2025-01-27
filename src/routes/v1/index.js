const express = require('express');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const userRoute = require('./user.route')
const config = require('../../config/config');
const cityRoute= require('./city.route');
const deptRoute= require('./dept.route')
const customerRoute= require('./customer.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/customers',
    route: customerRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
