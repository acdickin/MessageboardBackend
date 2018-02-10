'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _MessageRoutes = require('./routes/MessageRoutes');

var _MessageRoutes2 = _interopRequireDefault(_MessageRoutes);

var _UserRoutes = require('./routes/UserRoutes');

var _UserRoutes2 = _interopRequireDefault(_UserRoutes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _header = require('./middleware/header');

var _header2 = _interopRequireDefault(_header);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var db = _config2.default.config.db;
console.log(db);
_mongoose2.default.connect(db);
_mongoose2.default.set('debug', true);

//middleware
var port = process.env.PORT || 63145;
app.use(_express2.default.static(__dirname));

app.use(_header2.default);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
	extended: true
}));

(0, _MessageRoutes2.default)(app);
(0, _UserRoutes2.default)(app);

app.get('/', function (req, res) {
	res.send('node and express server is running on port ' + port);
});

app.listen(port, function () {
	console.log('Your server is running on port ' + port);
});