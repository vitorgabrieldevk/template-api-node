const userRoutes = require('express').Router();
const {
  loginUserController,
  createNewUserController,
  // changeUserEmailController,
  // changeUserPasswordController,
} = require('./users.controller');

const isAuthenticated = require('../../middlewares/isAuthenticated');
const isApiKey = require('../../middlewares/isApiKey');

userRoutes.post('/users/login', isApiKey, loginUserController);
userRoutes.post('/users/new', isApiKey, createNewUserController);
// userRoutes.patch('/users/email', isAuthenticated, changeUserEmailController);
// userRoutes.patch('/users/password', isAuthenticated, changeUserPasswordController);

module.exports = userRoutes;
