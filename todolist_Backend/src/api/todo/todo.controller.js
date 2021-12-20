import  Joi from 'joi'
import Todo from './todo.model';

export default {
        async create(req, res) {
            try {
                const schema = Joi.object().keys({
                    todo_title: Joi.string().required(),
                    todo_content: Joi.string().required(),
                    todo_priority: Joi.string().required(),
                    todo_completed: Joi.boolean().required(),
                });
                const { value, error } = Joi.validate(req.body, schema);
                if (error && error.details) {
                    return res.status(400).json(error);
                }
                const todo = await Todo.create(value);
                return res.json(todo);
            } catch (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        },
    async findAll1(req, res) {
            const {page, perPage }= req.query;
            const  option = {
                page : parseInt(page,10) || 1,
                limit: parseInt(perPage,10) ||10

            };
        try {
            const todo = await Todo.paginate({},option);
            return res.json(todo);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async findAll(req, res) {
        try {
            let {trangthai} = req.query
            // viết api danh sách, có tìm kiếm dữ liệu, theo điều kiện truy vấn.

            // khai báo object filter để đưa vào func find của mongosee
            let objQuery = {}
            if(trangthai === '0'){
                objQuery.todo_completed = false
            }else if(trangthai === '1'){
                objQuery.todo_completed = true
            }
            const todo = await Todo.find(objQuery);
            return res.json(todo);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async findOne(req , res){
            try {
                const {id}= await req.params;
                const todo = await Todo.findById(id);
                if (!todo){
                    return res.json({msg:' Không có công việc'});
                }
                return res.json(todo);
            } catch (err) {
                console.error(err);
                return res.status(500).send(err);
            }


    },
    async update(req , res){
            const  {id} = await  req.params;
            const schema = Joi.object().keys({
                todo_title: Joi.string().required(),
                todo_content: Joi.string().required(),
                todo_priority: Joi.string().required(),
                todo_completed: Joi.boolean().required(),

            });
            const { value, error } = Joi.validate(req.body, schema);
            if (error && error.details) {
                return res.status(400).json(error);
            }
            const todo = await Todo.findOneAndUpdate({ _id: id }, value, { new: true });
            return res.json(todo);

    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const todo = await Todo.findOneAndRemove({ _id: id });
            if (!todo) {
                return res.status(404).json({ err: 'could not find todo' });
            }
            return res.json(todo);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

};