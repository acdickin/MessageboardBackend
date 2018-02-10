'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = exports.UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	passhash: { type: String },
	created: { type: Date, default: Date.now }
});