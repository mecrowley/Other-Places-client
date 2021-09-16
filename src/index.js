import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { OtherPlaces } from './components/OtherPlaces';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <OtherPlaces />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);