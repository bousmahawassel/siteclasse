import React, {Component} from 'react'
import axios from 'axios'
import * as constants from '../../utils/constants'
import './Auth.css'

export default class ResetLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            link: props.location.pathname.substring(16),
            false_link: false,
        };
        this.VerifyLink = this.VerifyLink.bind(this)
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
                await this.setState({false_link: true});
                let error = document.getElementsByClassName("error")[0];
                error.removeAttribute("hidden");
                error.textContent = e.response.data.error;
                document.getElementsByTagName("form")[0].setAttribute("hidden", "")
            }
        }
    }
    SaveNewPassword = (event) => {
        this.setState({newPassword:event.target.value})
    };
    render() {
        return (
            <>
                <p className="error" hidden/>
                <form>
                    <p>
                        <label>
                            Nouveau mot de passe:
                            <input type="password" value={this.state.newPassword} onChange={this.SaveNewPassword}/>
                        </label>
                        <br/>
                        <input type="button" value="Changer mon mot de passe"/>
                    </p>
                </form>
            </>
        )
    }
}