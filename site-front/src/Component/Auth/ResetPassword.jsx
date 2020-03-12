import React, {Component} from 'react';
import axios from "axios";
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
import './Auth.css';
import {Alert} from 'react-bootstrap';

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: ""
        };
        this.submitForm = this.submitForm.bind(this)
    }
    async submitForm(event) {
        event.preventDefault();
        event.stopPropagation();
        try {
            const promise = await axios.post(constants.BACKEND_SERVER + "/api/reset_password", {email: this.state.email});
            if (promise.status === 200) {
                let success = document.getElementsByClassName("alert-success")[0];
                success.removeAttribute("hidden");
                success.textContent = promise.data.success
            }
        } catch(e) {
            if (e.response.status === 404) {
                let alert = document.getElementsByClassName("alert-danger")[0];
                alert.textContent = e.response.data.error;
                alert.removeAttribute("hidden")
            } else if (e.response.status === 500) {
                let alert = document.getElementsByClassName("alert-danger")[0];
                alert.textContent = e.response.data.error;
                alert.removeAttribute("hidden")
            }
        }

    }
    fieldBlur = (event) => {
        if(event.target.value !== "") {
                event.target.classList.add("has-val");
            }
            else {
                event.target.classList.remove('has-val');
            }
    };
    saveEmail = (event) => {
        this.setState({email: event.target.value})
    };
    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-b-160 p-t-50">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title p-b-43">
                                Changement de mot de passe
                            </span>
                            <Alert variant="danger" hidden/>
                            <Alert variant="success" hidden/>
                            <div className="wrap-input100 rs1 rs2 validate-input" style={{width: "100%"}}
                                 data-validate = "L'adresse e-mail est nécessaire">
                                <input className="input100" type="email" name="email" onBlur={this.fieldBlur}
                                       value={this.state.email} onChange={this.saveEmail}/>
                                <span className="label-input100">Adresse email</span>
                            </div>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={this.submitForm}>
                                    M'envoyer un mail pour changer de mot de passe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}