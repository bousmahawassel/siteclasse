import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import './App.css';
import TimeTable from './Component/TimeTable/TimeTable';
import Auth from './Component/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              {/*<Route component={Auth} path="/" exact/>*/}
              <Route path="/" exact>
                  <Redirect to="/edt/"/>
              </Route>
              <Route component={TimeTable} path={"/edt/"} exact/>
              <Route render={function render() {return (<p>Error</p>)}} path="*"/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
