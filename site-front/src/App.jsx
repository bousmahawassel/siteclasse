import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TimeTable from './Component/TimeTable/TimeTable'

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route component={TimeTable} path={"/edt"}/>
            <Route render={function render() {return (<p>Error</p>)}} path="*"/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
