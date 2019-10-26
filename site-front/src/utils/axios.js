import axios from 'axios';
import * as constants from './constants';

const auth_axios = {
    get: (url) => {
        if (localStorage.getItem("token") === null) {
            return "Not authenticated"
        }
        return axios.get(
            constants.BACKEND_SERVER + url,
            {
                headers: {
                    Authorization:`Token ${localStorage.getItem("token")}`
                }
            }
        )
    },
    post: (url, data) => {
        if (localStorage.getItem("token") === null) {
            return "Not authenticated"
        }
        return axios.post(
            constants.BACKEND_SERVER + url,
            data,
            {
                headers: {
                    Authorization:`Jeton d'authentification ${localStorage.getItem("token")}`
                }
            }
        )
    },
};

export default auth_axios;