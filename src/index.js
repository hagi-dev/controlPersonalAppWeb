import axios from 'axios';
import React from 'react'
import ReactDOM from 'react-dom';
import App from "./routes/App";

axios.defaults.baseURL = `${process.env.REACT_APP_API_HOST}/api`;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(<App/>, document.getElementById('app'));
