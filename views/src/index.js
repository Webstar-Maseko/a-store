import React from 'react';
import ReactDOM from 'react-dom';
import App from "./Components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./Components/context/authContext";
import store from './Components/Redux/store/store';
import {Provider} from "react-redux";

ReactDOM.render(
  <Provider store={store} >
  <AuthProvider>
    <App /> 
  </AuthProvider>
  </Provider>
,
  document.getElementById('root')
);

