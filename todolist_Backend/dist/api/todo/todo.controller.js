'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _todo = require('./todo.model');

var _todo2 = _interopRequireDefault(_todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    create: async function create(req, res) {
        try {
            var schema = _joi2.default.object().keys({
                todo_title: _joi2.default.string().required(),
                todo_content: _joi2.default.string().required(),
                todo_priority: _joi2.default.string().required(),
                todo_completed: _joi2.default.boolean().required()
            });

            var _Joi$validate = _joi2.default.validate(req.body, schema),
                value = _Joi$validate.value,
                error = _Joi$validate.error;

            if (error && error.details) {
                return res.status(400).json(error);
            }
            var todo = await _todo2.default.create(value);
            return res.json(todo);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    findAll1: async function findAll1(req, res) {
        var _req$query = req.query,
            page = _req$query.page,
            perPage = _req$query.perPage;

        var option = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10

        };
        try {
            var todo = await _todo2.default.paginate({}, option);
            return res.json(todo);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    findAll: async function findAll(req, res) {
        try {
            var trangthai = req.query.trangthai;
            // viết api danh sách, có tìm kiếm dữ liệu, theo điều kiện truy vấn.

            // khai báo object filter để đưa vào func find của mongosee

            var objQuery = {};
            if (trangthai === '0') {
                objQuery.todo_completed = false;
            } else if (trangthai === '1') {
                objQuery.todo_completed = true;
            }
            var todo = await _todo2.default.find(objQuery);
            return res.json(todo);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    findOne: async function findOne(req, res) {
        try {
            var _ref = await req.params,
                id = _ref.id;

            var todo = await _todo2.default.findById(id);
            if (!todo) {
                return res.json({ msg: ' Không có công việc' });
            }
            return res.json(todo);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    update: async function update(req, res) {
        var _ref2 = await req.params,
            id = _ref2.id;

        var schema = _joi2.default.object().keys({
            todo_title: _joi2.default.string().required(),
            todo_content: _joi2.default.string().required(),
            todo_priority: _joi2.default.string().required(),
            todo_completed: _joi2.default.boolean().required()

        });

        var _Joi$validate2 = _joi2.default.validate(req.body, schema),
            value = _Joi$validate2.value,
            error = _Joi$validate2.error;

        if (error && error.details) {
            return res.status(400).json(error);
        }
        var todo = await _todo2.default.findOneAndUpdate({ _id: id }, value, { new: true });
        return res.json(todo);
    },
    delete: async function _delete(req, res) {
        try {
            var id = req.params.id;

            var todo = await _todo2.default.findOneAndRemove({ _id: id });
            if (!todo) {
                return res.status(404).json({ err: 'could not find todo' });
            }
            return res.json(todo);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    }
};
//# sourceMappingURL=todo.controller.js.map