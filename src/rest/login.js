import axios from 'axios';
import configs from './configs';

//axios.defaults.withCredentials = true

class Login {
	async login() {
		return axios.post(
			configs.url + '/login',
			{
				"email": "2",
				"password": "2"
			},
			{ 
				headers: configs.headers
			}
		)
	}
}

export default new Login();