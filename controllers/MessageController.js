'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createMessage = exports.getMessagesByUser = exports.getAllMessages = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _MessageModel = require('../models/MessageModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = _mongoose2.default.model('message', _MessageModel.MessageSchema);

var getAllMessages = exports.getAllMessages = function getAllMessages(req, res) {
	Message.find({}, function (err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
};
var getMessagesByUser = exports.getMessagesByUser = function getMessagesByUser(req, res) {
	var QueryUser = req.params.user;
	Message.find({ user: QueryUser }, function (err, user) {
		if (err) {
			res.json({ user: "No Posts from that use Name", text: "" });
		}
		res.json(user);
	});
};

var createMessage = exports.createMessage = function createMessage(req, res) {

	console.log("create user:", req.body);

	var newMessage = new Message({
		user: req.body.user,
		text: req.body.text
	});
	newMessage.save(function (err) {
		if (err) {
			console.log("error occured", err);
			throw err;
		} else {
			res.json({
				message: 'successful'
			});
		}
	});
};