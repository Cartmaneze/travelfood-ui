import axios from 'axios';
import configs from './configs';

class MealApi {
    async getAllMeals(dayId) {
        console.log('rest getAllMeals');
		return axios.get(
			configs.url + `/meal?dayId=${dayId}`,
			{},
			{
				headers: configs.headers, 
			}
        )
    }
    
    async createMeal(dayId, foodId, weight = 100) {
        console.log('rest createMeal - dayId:' + dayId + ' foodId:' + foodId + ' wight:' + weight);
		return axios.post(
			configs.url + '/meal',
			{
				"day_id": dayId,
                "food_id": foodId,
                "weight": weight
			},
			{
				headers: configs.headers
			}
		)
    }
}

export default new MealApi();