import React, {Component} from 'react';
import axios from "axios";
import * as constants from '../../utils/constants'
import './Auth.css'

export default class ResetPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: ""
        }
        this.SubmitForm = this.SubmitForm.bind(this)
    }
    async SubmitForm(event) {
        event.preventDefault();
        try {
            const promise = await axios.post(constants.BACKEND_SERVER + "/api/reset_password", {email: this.state.email});
            if (promise.status === 200) {
                document.getElementsByClassName("success")[0].removeAttribute("hidden");
                document.getElementsByTagName("form")[0].setAttribute("hidden",  "")
            }
        } catch(e) {
            if (e.response.status === 404) {
                document.getElementsByClassName("error")[0].textContent = e.response.data.error
            } else if (e.response.status === 500) {
                document.getElementsByClassName("error")[0].textContent = e.response.data.error
            }
        }

    }
    render() {
        return (
            <>
                <p>
                    Changement de mot de passe
                </p>
                <form>
                    <p>
                        <span className="error"/>
                        <br/>
                        <label>
                            Adresse e-mail:
                            <input type="email"/>
                        </label>
                        <br/>
                        <input type="submit" onClick={this.SubmitForm} value="M'envoyer un lien par mail pour changer mon mail"/>
                    </p>
                </form>
                <p className="success" hidden>Tu devrait recevoir un mail d'ici quelques minutes</p>
            </>
        )
    }
}