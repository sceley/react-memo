import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Memo from './Memo';
import Unfolded from "./Unfolded";
import './css/App.css';
let App = () => (
    <Router>
        <div className="app-container-fluid">
            <Route exact path='/' component={ Home }/>
            <Route path='/memo' component={ Memo }/>
            <Route path="/unfolded/:tableName" component={ Unfolded }/>
        </div>
    </Router>
);

export default App;
