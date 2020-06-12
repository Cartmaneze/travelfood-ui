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
    outline: none !important;
    outline-offset: none !important;
	background-color: green;
	padding: 16px 16px;
	border-radius: 20%;
	border: 1px solid lightgrey;
	float: right;
	margin-left: 25%;
	&:hover {
		color: white;
    	background-color: darkgreen;
  	}
`;

export default class DaysList extends Component {

	state = {
        days: []
	}

    componentWillReceiveProps = async (nextProps) => {
        if (this.props.lastClickedJourneyId !== nextProps.lastClickedJourneyId) {
            let data = await this.getAllDays(nextProps.lastClickedJourneyId);
            if (data.length > 0) {
                this.props.setLastClickedDay(data[0].id);
            }
            this.setState({
                days: data
            });
        }
    }

	render() {
		return (
			<Container>
				<Title> Days </Title>
				{
					this.state.days.map(day => {
                        return <Day key={day.id} dayId={day.id} removeDay={this.removeDay} daysListSize={this.state.days.length}
                        setLastClickedDay={this.setLastClickedDay.bind(this)} lastClickedDayId={this.props.lastClickedDayId}/>
					})
				}
				<NewDayButton onClick={this.addNewDay}>new day</NewDayButton>
			</Container>
		)
	}

	getAllDays = async (lastClickedJourneyId) => {
		let res = await restApi.getAllDays(lastClickedJourneyId);
		return res.data;
    }
    
    setLastClickedDay(id) {
        this.props.setLastClickedDay(id);
    }

	addNewDay = async () => {
        let days = this.state.days;
		let res = await restApi.createDay(this.props.lastClickedJourneyId);
        days.push(res.data);
		this.setState({
			days: days
        });
	}

	removeDay = async (id) => {
		await restApi.removeDay(id);
        let data = await this.getAllDays(this.props.lastClickedJourneyId);
        if (data.length > 0) {
            this.props.setLastClickedDay(data[0].id);
        }
		this.setState({
			days: data
        });
	}
}