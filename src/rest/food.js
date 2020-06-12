import axios from 'axios';
import configs from './configs';

class FoodApi {
    async getAllFood() {
        console.log('rest getAllFood');
		return axios.get(
			configs.url + `/food`,
			{},
			{ 
				headers: configs.headers, 
			}
        )
	}
}

export default new FoodApi();