import {Link} from "react-router-dom";
import React from "react";

export const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ""}>{props.todo.todo_title}</td>
        <td className={props.todo.todo_completed ? 'completed' : ""}>{props.todo.todo_content}</td>
        <td className={props.todo.todo_completed ? 'completed' : ""}>{props.todo.todo_priority}</td>
        <td className="text-center text-white">
            <span className={props.todo.todo_completed ? 'bg-success' :"bg-info"}>
                {props.todo.todo_completed ? " Đã hoàn thành" :' Chưa hoàn thành'}
            </span>
        </td>
        <td>
            <button className="btn btn-warning" ><Link className="text-white" to={"/edit/" + props.todo._id} >
                <i className="fa fa-edit"></i>Sửa</Link>
            </button>
            <button className={"btn btn-danger"} onClick={() => props.deleteFunc(props.todo._id)}>
                <i className="fa fa-trash"></i> Xoá
            </button>
        </td>
    </tr>
)