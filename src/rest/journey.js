import axios from 'axios';
import configs from './configs';

class JourneyApi {
	async getAllJourneys() {
		return axios.get(
			configs.url + '/journey',
			{},
			{ 
				headers: configs.headers, 
			}
        )
    }
    
    async createJourney() {
		return axios.post(
			configs.url + '/journey',
			{
				"name": "1"
			},
			{ 
				headers: configs.headers
			}
		)
    }
    
    async removeJourney(id) {
		return axios.delete(
			configs.url + `/journey/${id}`,
			{},
			{ 
				headers: configs.headers, 
			}
		)
	}
}

export default new JourneyApi();