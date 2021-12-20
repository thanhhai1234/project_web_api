import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListTodo from './component/ListTodo';
import EditTodo from './component/EditTodo';
import CreateTodo from './component/CreateTodo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './images/logotodo1.jpg'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IndexTodo from "./component/IndexTodo";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-inverse">
                   
                  <Link to ="/" className="navbar-brand text-light">Trang chủ</Link>
                    <ul className="navbar-nav mr-auto navbar-dark">
                        <li className="navbar-item active list-group">
                            <Link to ="/todo" className="nav-link text-light" >danh sách công việc</Link>
                        </li>
                    </ul>
                </nav>
                <Route path="/" exact component={IndexTodo} />
                <Route path="/todo" component={ListTodo} />
                <Route path="/edit/:id" component={EditTodo} />
                <Route path="/create" component={CreateTodo} />
                <ToastContainer />
                <center><footer className="card-footer ">  <p>Đỗ Thanh Hải</p> </footer></center>
            </div>

        </Router>

    );
  }
}
export default App;