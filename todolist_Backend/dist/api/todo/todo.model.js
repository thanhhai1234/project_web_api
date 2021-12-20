'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var todoSchema = new Schema({
    todo_title: {
        type: String
    },
    todo_content: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean,
        default: false
    }
});
todoSchema.plugin(_mongoosePaginate2.default);
exports.default = _mongoose2.default.model('Todo', todoSchema);
//# sourceMappingURL=todo.model.js.map