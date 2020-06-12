import axios from 'axios';
import configs from './configs';

class DayApi {
	async getAllDays(journeyId) {
        console.log('rest getAllDays - journeyId:' + journeyId);
		return axios.get(
			configs.url + `/day?journeyId=${journeyId}`,
			{},
			{ 
				headers: configs.headers, 
			}
        )
	}

	async createDay(journeyId) {
        console.log('rest createDay - journeyId:' + journeyId);
		return axios.post(
			configs.url + '/day',
			{
				"number": "1",
				"journey_id": journeyId
			},
			{ 
				headers: configs.headers
			}
		)
	}

	async removeDay(id) {
        console.log('rest removeDay - id:' + id);
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