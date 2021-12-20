import React, {Component} from "react";
import axios from "axios";
import {toastError, toastSuccess} from "../helpers/toastHelper";
import { URL_API } from "../constant/constant";

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            title: '',
            content: '',
            todo_priority: 'Thấp',
            todo_completed: false,
            loading: true
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async onSubmit(e) {
        const newtodo = {
            todo_title: this.state.title,
            todo_content: this.state.content,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        axios.post(URL_API +'todos/create', newtodo)
            .then(response => {
                if (response.data != null) {
                   toastSuccess()
                    console.log(response.data)
                }
            })
            .catch(err => {
                toastError()
            })
        this.setState({
            title: '',
            content: '',
            todo_priority: '',
            todo_completed: false,

        })
    }
    render() {
        return (
            

            <form>

                <h3> Thêm công việc mới</h3>

                <div className="form-group">
                    <label> Chủ đề</label>
                    <input type="text" className="form-control" name="title" value={this.state.title}
                           onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label> Nội dung </label>
                    <input type="text" className="form-control" name="content" value={this.state.content}
                           onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label>Thứ tự ưu tiên</label>
                    <br/>
                    <div className="form-check form-check-inline">
                        <label>
                            <input type="radio"
                               name="todo_priority"
                               value="Thấp"
                               checked={this.state.todo_priority === "Thấp"}
                               onChange={this.handleInputChange}/>
                               Thấp
                        </label>
                    </div>
                    <div className="custom-radio">
                        <label>
                            <input type="radio"
                               name="todo_priority"
                               value="Cao"
                               checked={this.state.todo_priority === "Cao"}
                               onChange={this.handleInputChange}/>
                                 Cao
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <button type="button" className="btn-success" onClick={this.onSubmit.bind(this)}> Thêm mới
                    </button>
                </div>
            </form>
        );
    }
}