import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import TimeTable from './Component/TimeTable/TimeTable';
import Auth from './Component/Auth/Auth';
import Home from './Component/Home/Home';
import ResetPassword from './Component/Auth/ResetPassword';
import ResetLink from './Component/Auth/ResetLink';
import Header from './Component/Header/Header';
import Reload from './Component/Reload/Reload';
import Footer from './Component/Footer/Footer';

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                    <Switch>
                        <Route component={Auth} path="/auth" exact/>
                        <Route component={TimeTable} path="/infos/edt"/>
                        <Route component={ResetPassword} path="/reset_password" exact/>
                        <Route component={ResetLink} path="/reset_password"/>
                        <Route path="/" component={Home} exact/>
                        <Route path="/reload" component={Reload}/>
                        <Route render={function render() {return (<p>Error</p>)}} path="*"/>
                    </Switch>
                    <Footer/>
      </Router>
    </div>
  );
}

export default App;
