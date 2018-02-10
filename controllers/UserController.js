'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.checkAuthenticated = exports.updateUser = exports.authUser = exports.createUser = exports.loginUser = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _UserModel = require('../models/UserModel');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../config');

var User = _mongoose2.default.model('user', _UserModel.UserSchema);

var loginUser = exports.loginUser = function loginUser(req, res) {

	User.find({ email: req.body.email }, function (err, docs) {
		if (err) {
			sendAuthError(res);
		} else {
			_bcrypt2.default.compare(req.body.password, docs[0].passhash, function (err, res) {
				if (err) {
					sendAuthError(res);
				} else {
					sendToken(docs, res);
				}
			});
		}
	});
};

var createUser = exports.createUser = function createUser(req, res) {
	var newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		passhash: ""
	});

	_bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
		if (err) {
			console.log("error with hash");
		} else {
			newUser.passhash = hash;
		}
	});

	User.find({ email: req.body.email }, function (err, docs) {
		if (docs.length) {
			res.json({ message: "user already exists" });
		} else {
			newUser.save(function (err) {
				if (err) {

					throw err;
				} else {
					newUser;
					delete newUser.passhash;

					sendToken(newUser, res);
				}
			});
		}
	});
};

var authUser = exports.authUser = function authUser(req, res) {

	var UserId = req.id;
	User.findById(UserId, function (err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
};

var updateUser = exports.updateUser = function updateUser(req, res) {

	var UserId = req.id;
	User.updateOne({ _id: UserId }, {
		$set: { "firstName": req.body.firstName, "lastName": req.body.lastName }
	}, function (err, results) {
		if (err) {
			throw err;
		} else {
			res.json(results.result);
		}
	});
	res.json(user);
};

function sendToken(user, res) {
	var token = _jsonwebtoken2.default.sign(user.id, config.config.secret);
	res.json({ firstName: user.firstName, token: token });
}

function sendAuthError(res) {
	return res.json({ success: false, message: "email or password incorrect" });
}

var checkAuthenticated = exports.checkAuthenticated = function checkAuthenticated(req, res, next) {
	if (!req.header('authorization')) {
		//return res.status(401).send({message: 'Unauthorized request. Missing Authentication Header'})
		console.log('Unauthorized request. Authentication Header invalid');
	}

	var token = req.header('authorization').split(" ")[1];
	var payload = _jsonwebtoken2.default.decode(token, config.config.secret);

	if (!payload) {
		//return res.status(401).send({message: 'Unauthorized request. Authentication Header invalid'})
		console.log('Unauthorized request. Authentication Header invalid');
	}

	req.id = payload;
	next();
};