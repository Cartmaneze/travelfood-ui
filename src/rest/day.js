import axios from 'axios';
import configs from './configs';

class DayApi {
	async getAllDays() {
		return axios.get(
			configs.url + '/day',
			{},
			{ 
				headers: configs.headers, 
			}
		)
	}

	async createDay() {
		return axios.post(
			configs.url + '/day',
			{
				"number": "1",
				"journey_id": 1
			},
			{ 
				headers: configs.headers
			}
		)
	}

	async removeDay(id) {
		return axios.delete(
			configs.url + `/day/${id}`,
			{},
			{ 
				headers: configs.headers, 
			}
		)
	}
}

export default new DayApi();