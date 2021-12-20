'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _todo = require('./api/todo/todo.router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 4000;
var app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use('/api/todos', _todo.todoRouter);
_mongoose2.default.connect('mongodb+srv://Cuongyd196:1@cluster0.q4glj.mongodb.net/db_todolist?retryWrites=true&w=majority');

_mongoose2.default.connection.once('open', function () {
    console.log("Connection mongodb success");
});

app.listen(PORT, function () {
    console.log(" Server is running on Port : ", PORT);
});
//# sourceMappingURL=server.js.map