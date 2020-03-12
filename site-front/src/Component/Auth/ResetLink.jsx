import React, {Component} from 'react';
import axios from 'axios';
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
import './Auth.css';

export default class ResetLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            link: props.location.pathname.substring(16),
        };
        this.VerifyLink = this.VerifyLink.bind(this);
        this.submitForm = this.submitForm.bind(this)
    }
    componentDidMount() {
        this.VerifyLink();
    }
    async VerifyLink() {
        try {
            const promise = await axios.get(constants.BACKEND_SERVER + "/api/reset_password/" + this.state.link);
            if (promise.status === 200) {
                //Le lien fonctionne, on a rien à faire
            }
        } catch(e) {
            if (e.response.status === 400) {
                let error = document.getElementsByClassName("alert-danger")[0];
                error.removeAttribute("hidden");
                error.textContent = e.response.data.error;
                document.getElementsByTagName("input")[0].setAttribute("disabled", "");
                let btn = document.getElementsByClassName("login100-form-btn")[0];
                btn.setAttribute("disabled", "");
                btn.style.backgroundColor = "grey";
            }
        }
    }
    async submitForm(event) {
        event.preventDefault();
        event.stopPropagation();
        try {
            let promise = await axios.post(constants.BACKEND_SERVER + "/api/reset_password/" + this.state.link, {password: this.state.newPassword});
            if (promise.status === 202) {
                let suc_alert = document.getElementsByClassName("alert-success")[0];
                suc_alert.removeAttribute("hidden");
                suc_alert.textContent = promise.data.success
            }
        } catch (e) {
            if (e.response.status === 406) {
                let err_alert = document.getElementsByClassName("alert-danger")[0];
                err_alert.removeAttribute("hidden");
                err_alert.textContent = e.response.data.error
            }
        }
    }
    SaveNewPassword = (event) => {
        this.setState({newPassword: event.target.value})
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
                                <input className="input100" type="password" name="pass" onBlur={this.fieldBlur}
                                       value={this.state.newPassword} onChange={this.SaveNewPassword}/>
                                <span className="label-input100">Nouveau mot de passe</span>
                            </div>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={this.submitForm}>
                                    Changer mon mot de passe (et faire en sorte de ne plus jamais l'oublier...)
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}