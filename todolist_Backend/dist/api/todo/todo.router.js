'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _todo = require('./todo.controller');

var _todo2 = _interopRequireDefault(_todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoRouter = exports.todoRouter = _express2.default.Router();


todoRouter.post('/create', _todo2.default.create);
todoRouter.get('/findAll', _todo2.default.findAll);

todoRouter.put('/update/:id', _todo2.default.update);
todoRouter.delete('/delete/:id', _todo2.default.delete);
todoRouter.get('/findOne/:id', _todo2.default.findOne);
//# sourceMappingURL=todo.router.js.map