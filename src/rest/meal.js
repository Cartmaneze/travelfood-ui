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
    
    async createMeal(dayId, foodId, weight = 100, index) {
        console.log(`rest createMeal - dayId: ${dayId} foodId: ${foodId} wight: ${weight} index: ${index}`);
		return axios.post(
			configs.url + '/meal',
			{
				"day_id": dayId,
                "food_id": foodId,
                "weight": weight,
                "index": index
			},
			{
				headers: configs.headers
			}
		)
    }

    async removeMeal(id) {
        console.log(`rest removeMeal - id: ${id}`);
		return axios.delete(
			configs.url + `/meal/${id}`,
			{},
			{ 
				headers: configs.headers, 
			}
		)
    }
}

export default new MealApi();