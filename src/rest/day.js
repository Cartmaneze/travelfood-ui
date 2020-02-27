import axios from 'axios';
import configs from './configs';

class DayApi {
	async getAllDays() {
		const response = await axios.get(
			configs.url + '/day',
			{},
			{ headers: configs.headers }
		)
		return response;
	}

	async createDay() {
		const response = await axios.post(
			configs.url + '/day',
			{
				"number": "1",
				"journey_id": 1
			},
			{ headers: configs.headers }
		)
		return response;
	}

	async removeDay(id) {
		const response = await axios.delete(
			configs.url + `/day/${id}`,
			{},
			{ headers: configs.headers }
		)
		return response;
	}
}

export default new DayApi();