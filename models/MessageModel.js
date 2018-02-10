'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MessageSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var MessageSchema = exports.MessageSchema = new Schema({
	user: { type: String, required: true },
	text: { type: String, required: true },
	created: { type: Date, default: Date.now }
});