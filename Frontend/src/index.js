import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import AppState from './Context/AppState';
import {BrowserRouter} from "react-router-dom";

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
  <AppState>
      
    <App />
    
  </AppState>
    </BrowserRouter>
);

