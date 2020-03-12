import React, {Component} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import * as constants from '../../utils/constants';
import './css/main.scoped.css';
import './css/util.scoped.css';
import './fonts/OpenSans/OpenSans-Bold.ttf';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.scoped.css';
import './fonts/Linearicons-Free-v1.0.0/icon-font.min.scoped.css';
import './vendor/animate/animate.scoped.css';
import './vendor/css-hamburgers/hamburgers.min.scoped.css';
import './vendor/animsition/css/animsition.min.scoped.css';
import './vendor/select2/select2.min.scoped.css';
import './vendor/daterangepicker/daterangepicker.scoped.css';

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
    async submitForm(event) {
        event.preventDefault();
        try {
            const promise = await axios.post(constants.BACKEND_SERVER + "/api/login", {...this.state.loginInfos});
            localStorage.setItem("token", promise.data.token);
            this.setState({authenticated: true})
        } catch(e) {
            try {
                if (e.response.status === 401) {
                    let alert = document.getElementsByClassName("alert-danger")[0];
                    alert.textContent = e.response.data.error;
                    alert.removeAttribute("hidden")
                }
            } catch(err) {
                    let alert = document.getElementsByClassName("alert-danger")[0];
                    alert.textContent = "La requête n'a pas pu être envoyée au serveur";
                    alert.removeAttribute("hidden")
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
    fieldBlur = (event) => {
        if(event.target.value !== "") {
                event.target.classList.add("has-val");
            }
            else {
                event.target.classList.remove('has-val');
            }
    };
    render() {
        if (!this.state.forgotPassword) {
            if (!this.state.authenticated) {
                return (
                    <div className="limiter">
                        <div className="container-login100">
                            <div className="wrap-login100 p-b-160 p-t-50">
                                <form className="login100-form validate-form">
                                    <span className="login100-form-title p-b-43">
                                        Account Login
                                    </span>
                                    <Alert variant="danger" hidden/>
                                    <div className="wrap-input100 rs1 validate-input" data-validate = "L'adresse e-mail est nécessaire">
                                        <input className="input100" type="email" name="email" onBlur={this.fieldBlur}
                                               value={this.state.loginInfos.email} onChange={this.saveEmail}/>
                                        <span className="label-input100">Adresse email</span>
                                    </div>
                                    <div className="wrap-input100 rs2 validate-input" data-validate="Le mot de passe est nécessaire">
                                        <input className="input100" type="password" name="pass" onBlur={this.fieldBlur}
                                               value={this.state.loginInfos.password} onChange={this.savePassword}/>
                                        <span className="label-input100">Password</span>
                                    </div>
                                    <div className="container-login100-form-btn">
                                        <button type="submit" className="login100-form-btn" onClick={this.submitForm}>
                                            Sign in
                                        </button>
                                    </div>
                                    <div className="text-center w-full p-t-23">
                                        <Link to="/reset_password" className="txt1">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (<Redirect to="/"/>)
            }
        } else {
            return (<Redirect to="/reset_password"/>)
        }
    }
}


export default Auth