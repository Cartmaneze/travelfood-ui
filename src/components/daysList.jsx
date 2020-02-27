import React, {Component} from 'react';
import styled from 'styled-components';
import Day from './day';
import restApi from '../rest/day';

const Container = styled.div`
//	margin: 8px;
//	border: 1px solid lightgrey;
//	border-radius: 2px;
	min-width: 140px;

	display: flex;
	flex-direction: column
`;

const Title = styled.h2`
	padding: 8px;
`;

const NewDayButton = styled.button`
	background-color: green;
	padding: 16px 16px;
	border-radius: 20%;
	border: 1px solid lightgrey;
	float: right;
	margin-left: 28%;
	&:hover {
		color: white;
    	background-color: darkgreen;
  	}
`;

export default class DaysTable extends Component {
	state = {
		days: [],
		daysCounter: 0
	}

	componentDidMount = async () => {
		let data = await this.getAllDays()
		this.setState({
			days: data,
			daysCounter: data.length
		});
	}

	render() {
		return (
			<Container>
				<Title> Days </Title>
				{
					this.state.days.map(day => {
						return <Day key={day.id} dayId={day.id} removeDay={this.removeDay}/>
					})
				}
				<NewDayButton onClick={this.addNewDay}>new day</NewDayButton>
			</Container>
		)
	}

	getAllDays = async () => {
		let res = await restApi.getAllDays();
		return res.data;
	}

	addNewDay = async () => {
		let newState = this.state;
		let days = this.state.days;
		let res = await restApi.createDay();
		let newDay = {
			id: res.data.id,
			name: res.data.number,
			journey_id: res.data.journey_id
		}
		days.push(newDay);
		newState.days = days;
		newState.daysCounter = days.length;
		this.setState(newState);
	}

	removeDay = async (id) => {
		await restApi.removeDay(id);
		let data = await this.getAllDays();
		this.setState({
			days: data,
			daysCounter: data.length
		});
	}
}