import axios from 'axios';

export default class RestApi {
	host = 'http://localhost:1234'

	async getAllDays() {
		console.log('getAllDays');
		const response = await axios.get(
			this.host + '/day',
			{},
			{ headers: { 'Content-Type': 'application/json'} }
		)
		return response;
	}

	async createDay() {
		console.log('createDay');
		const response = await axios.post(
			this.host + '/day',
			{
				"number": "1",
				"journey_id": 1
			},
			{ headers: { 'Content-Type': 'application/json'} }
		)
		return response;
	}

}