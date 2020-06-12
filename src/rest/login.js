import axios from 'axios';
import configs from './configs';

axios.defaults.withCredentials = true

class Login {
	async login(email, password) {
		return axios.post(
			configs.url + '/login',
			{
				"email": email,
				"password": password
			},
			{ 
				headers: configs.headers
			}
		)
    }

    async logout() {
        return axios.get(
            configs.url + '/logout',
            {},
            {
                headers: configs.headers
            }
        )
    }

    async register(email, password) {
		let res = await axios.post(
			configs.url + '/register',
			{
				"email": email,
				"password": password
			},
			{ 
				headers: configs.headers
			}
        )
        console.log(JSON.stringify(res, null, 4));
    }
}

export default new Login();