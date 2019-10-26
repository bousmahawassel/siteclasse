import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from './Logo_classe.png'
import './App.css';
import TimeTable from './Component/TimeTable/TimeTable';
import Auth from './Component/Auth/Auth';
import Home from './Component/Home/Home';
import ResetPassword from './Component/Auth/ResetPassword';
import ResetLink from './Component/Auth/ResetLink'

function App() {
  return (
    <div className="App">
      <Router>
          <div className="App-header">
              <img src={logo} alt="logo"/>
          </div>
          <Switch>
              <Route component={Auth} path="/auth" exact/>
              <Route component={TimeTable} path="/edt" exact/>
              <Route component={ResetPassword} path="/reset_password" exact/>
              <Route component={ResetLink} path="/reset_password"/>
              <Route path="/" component={Home} exact/>
              <Route render={function render() {return (<p>Error</p>)}} path="*"/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
