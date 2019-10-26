import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import * as constants from '../../utils/constants';
import './Auth.css'
//import auth_axios from '../../utils/axios'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginInfos: {
                email: "",
                password: "",
            },
            authenticated: false,
            forgotPassword: false
        };
        this.submitForm = this.submitForm.bind(this)
    }
    async submitForm() {
        try {
            const promise = await axios.post(constants.BACKEND_SERVER + "/api/login", {...this.state.loginInfos});
            localStorage.setItem("token", promise.data.token)
        } catch(e) {
            if (e.response.status === 401) {
                document.getElementsByClassName("error")[0].textContent = e.response.data.error
            }
        }
    };
    forgotPassword = () => {
        this.setState({forgotPassword: true})
    };
    saveEmail = (event) => {
        this.setState({
            loginInfos: {
                email: event.target.value,
                password:this.state.loginInfos.password
            }
        })
    };
    savePassword = (event) => {
        this.setState({
            loginInfos: {
                email:this.state.loginInfos.email,
                password: event.target.value
            }
        })
    };
    render() {
        if (!this.state.forgotPassword) {
            return (
                <>
                    <p>Connection</p>
                    <form>
                        <p>
                            <span className="error"/>
                            <br/>
                            <label>
                                Adresse email:
                                <input type="email" onChange={this.saveEmail} value={this.state.loginInfos.email}/>
                            </label>
                            <br/>
                            <label>
                                Mot de passe:
                                <input type="password" onChange={this.savePassword} value={this.state.loginInfos.password}/>
                            </label>
                            <input type="button" value="Mot de passe oublié ?" onClick={this.forgotPassword}/>
                            <br/>
                            <input type="button" value="Me connecter" id="Connexion" onClick={this.submitForm}/>
                        </p>
                    </form>
                </>
            )
        } else {
            return (<Redirect to="/reset_password"/>)
        }
    }
}

export default Auth