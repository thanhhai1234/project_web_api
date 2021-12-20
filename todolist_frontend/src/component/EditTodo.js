import React, {Component}  from "react";
import  axios  from 'axios';
import {URL_API} from '../constant/constant';
import { toastSuccess } from "../helpers/toastHelper";
import ReloadHelper from "../helpers/reloadHelper";



export  default  class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.onchangeTitle=this.onchangeTitle.bind(this);
        this.onchangeContent=this.onchangeContent.bind(this);
        this.onchangePriority=this.onchangePriority.bind(this);
        this.onchangeCompleted=this.onchangeCompleted.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            title: '',
            content: '',
            todo_priority: '',
            todo_completed: false,
            loading: true
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    async componentDidMount() {
        let todores = await axios.get(URL_API + 'todos/findOne/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.todo_title,
                    content: response.data.todo_content,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed,
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onchangeTitle(e) {
        this.setState({title: e.target.value});
    }

    onchangeContent(e) {
        this.setState({content: e.target.value});
    }

    onchangePriority(value) {
        console.log(value, 'checked')
        this.setState({todo_priority: value});
    }

    onchangeCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    async onSubmit(e)
    {
        const newtodo = {
            todo_title: this.state.title,
            todo_content: this.state.content,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        await axios.put(URL_API +'todos/update/'+this.props.match.params.id, newtodo)
            .then(res =>
                toastSuccess()
            )
            .catch(err=>{

            });
    }
    render()
    {
        return (
           
            <div>
                <ReloadHelper
                    loading={this.state.loading}
                />

                <form>
                    
                   
                        <h3> Cập nhật công việc </h3>

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
                            <label> Độ ưu tiên </label>
                            <br/>
                            <div className="form-check form-check-inline">
                                <input type="radio"
                                       name="priorityOptions"
                                       id="priorityLow"
                                       value="Thấp"
                                       checked={this.state.todo_priority === 'Thấp'}
                                       onChange={() => this.onchangePriority('Thấp')}/>
                                <label>Thấp</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input type="radio" name="priorityOptions"
                                       id="priorityHight"
                                       value="Cao"
                                       checked={this.state.todo_priority === 'Cao'}
                                       onChange={() => this.onchangePriority('Cao')}/>
                                <label>Cao</label>
                            </div>
                            <br/>
                            <div className="form-check form-check-inline">
                                <input  className="form-check-input"
                                        id="completedCheckbox"
                                        type="checkbox"
                                        name="completedCheckbox"
                                        onChange={this.onchangeCompleted}
                                        checked={this.state.todo_completed}
                                        value={this.state.todo_completed}
                                />
                                <label>Đã hoàn thành</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type={"button"}  className="btn-success" onClick= {this.onSubmit.bind(this)}>Cập nhật</button>
                        </div>
                    </form>
                
                
                     
                
                
            </div>
        );

    }

}
