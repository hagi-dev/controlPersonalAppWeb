import axios from 'axios';
import React from 'react'
import ReactDOM from 'react-dom';
import App from "./routes/App";
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = 'http://127.0.0.1:3000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(<App/>, document.getElementById('app'));
