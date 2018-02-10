'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MessageController = require('../controllers/MessageController');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageRoutes = function MessageRoutes(app) {

	app.route('/api/messages').get(function (req, res) {
		(0, _MessageController.getAllMessages)(req, res);
	});

	app.route('/api/messages/:user').get(function (req, res) {
		(0, _MessageController.getMessagesByUser)(req, res);
	});

	app.route('/api/message').post(function (req, res) {
		(0, _MessageController.createMessage)(req, res);
	});
};

exports.default = MessageRoutes;