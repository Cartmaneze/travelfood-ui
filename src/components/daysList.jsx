import React, {Component} from 'react';
import styled from 'styled-components';
import Day from './day';
import RestApi from './../rest';

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

	componentDidMount() {
		this.getAllDays()
			.then(data => {
				console.log(JSON.stringify(data, null, 4));
				this.setState({
					days: data,
					daysCounter: data.length
				});
			}).catch(err => {
				console.log(JSON.stringify(err, null, 4));
			})
	}

	render() {
		return (
			<Container>
				<Title> Days </Title>
				{
					this.state.days.map(day => {
						return <Day key={day.id} dayId={day.id} removeDay={this.removeDay} rerender={this.rerender}/>
					})
				}
				<NewDayButton onClick={this.addNewDay}>new day</NewDayButton>
			</Container>
		)
	}

	async getAllDays() {
		let rest = new RestApi();
		let res = await rest.getAllDays();
		return res.data;
	}

	addNewDay = () => {
		let newState = this.state;
		let days = this.state.days;
		let rest = new RestApi();
		rest.createDay()
			.then(data => {
				console.log(JSON.stringify(data, null, 4));
			}).catch(err => {
				console.log(err);
			})
		let newDay = {
			id: this.state.daysCounter
		}
		days.push(newDay);
		newState.days = days;
		newState.daysCounter = this.state.daysCounter + 1;
		this.setState(newState);
	}

	removeDay = (id) => {
		let newState = this.state;
		let days = this.state.days;
		days = days.filter(day => {
			if (day.id !== id) {
				return day;
			}
		})
		newState.days = days;
		this.setState(newState);
	}
}