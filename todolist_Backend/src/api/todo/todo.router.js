import  express from  'express';
export const todoRouter= express.Router();
import todoController from './todo.controller';

todoRouter.post('/create',todoController.create);
todoRouter.get('/findAll',todoController.findAll);


todoRouter.put('/update/:id',todoController.update);
todoRouter.delete('/delete/:id',todoController.delete);
todoRouter.get('/findOne/:id',todoController.findOne);

