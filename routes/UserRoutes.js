'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _UserController = require('../controllers/UserController');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserRoutes = function UserRoutes(app) {

	app.route('/auth/login').post(function (req, res) {
		console.log(req.body);
		(0, _UserController.loginUser)(req, res);
	});

	app.route('/auth/register').post(function (req, res) {
		(0, _UserController.createUser)(req, res);
	});

	app.route('/api/users/me').get(_UserController.checkAuthenticated, function (req, res) {
		(0, _UserController.authUser)(req, res);
	});

	app.route('/api/users/me').post(_UserController.checkAuthenticated, function (req, res) {
		(0, _UserController.updateUser)(req, res);
	});
};
exports.default = UserRoutes;