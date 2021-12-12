import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./Components/context/authContext";

ReactDOM.render(
  <AuthProvider>
    <App />
    </AuthProvider>,
  document.getElementById('root')
);


