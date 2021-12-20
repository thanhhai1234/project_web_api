import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toastError, toastSuccess} from "../helpers/toastHelper";
import { Todo } from "./TableTodo";
import ReloadHelper from "../helpers/reloadHelper";


export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todoList: [],
            filterstt: -2,
            loading: true
        };
        this.onchangeSTT=this.onchangeSTT.bind(this);
    }
    async componentDidMount() {
        let todosRes = await axios.get('http://localhost:4000/api/todos/findAll')
        this.setState({loading: false})
        if (todosRes) {
            this.setState({todos: todosRes.data, todoList: todosRes.data})
        }
    }
    deleteFunc(id) {
        axios.delete('http://localhost:4000/api/todos/delete/' + id)
            .then(response => {
                if (response.data != null) {
                    toastSuccess()
                    this.setState({
                        todos: this.state.todos.filter(todo => todo._id !== id)
                    });
                }
            })
            .catch(err => {
                toastError()
            });
    }
    async  onchangeSTT(event){
        let value = event.target.value
        this.setState({filterstt: value});
        let dataFilter = await axios.get('http://localhost:4000/api/todos/findAll?trangthai=' + value)
        this.setState({ loading: false })
        if(dataFilter){
            console.log(dataFilter.data, 'dataFilter.data')
            this.setState({todos: dataFilter.data})
        }
    }
  
    render() {
        return (
           
            <div> 

                <ReloadHelper
                    loading={this.state.loading}
                />
            
                <br/>
                <center><h3> Quản lý công việc</h3></center>
                <br/>
                <button className="btn btn-primary" ><Link className="text-white" to={"/create/"} >
                    <i className="fa fa-edit"></i>Thêm công việc </Link>
                </button>
                <table className="table  table-hover table-bordered table-hover">
                    <thead>
                    <tr className="text-dark text-center">
                        <th> Tiêu đề</th>
                        <th> Nội dung</th>
                        <th> Độ ưu tiên</th>
                        <th> Trạng thái</th>
                        <th> Hành động</th>
                    </tr>
                    <tr className="text-dark text-center">
                        <th> </th>
                        <th> </th>
                        <th> </th>
                        <th> <select onChange={this.onchangeSTT}  value={this.state.filterstt}  className="bg-info text-white" >
                            <option value="-1">Tất cả</option>
                            <option value="1">Đã hoàn thành</option>
                            <option value="0">Chưa hoàn thành</option>
                        </select></th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody className="bg-light  text-center">
                    {
                        this.state.todos.map((currentTodo, i) => {
                            return <Todo todo={currentTodo} key={i}
                                         deleteFunc={this.deleteFunc.bind(this)}
                            />
                        })
                    }
                    </tbody>
                </table>


            </div>


        )

    }

}