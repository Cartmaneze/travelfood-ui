import React, {Component} from 'react';
import styled from 'styled-components';
import Journey from './journey';
import restApi from '../rest/journey';

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

const NewJourneyButton = styled.button`
    outline: none !important;
    outline-offset: none !important;
	background-color: #711789;
	padding: 16px 16px;
	border-radius: 20%;
	border: 1px solid lightgrey;
	float: right;
	margin-left: 21%;
	&:hover {
		color: white;
    	background-color: #541066;
  	}
`;

export default class JourneysList extends Component {
	state = {
        journeys: []
	}

	componentDidMount = async () => {
        let journeys = await this.getAllJourneys();
        if (journeys.length > 0) {
            console.log('this.props.setLastClickedJourney(journeys[0].id); - ' + journeys[0].id);
            this.props.setLastClickedJourney(journeys[0].id);
        }
        this.setState({
            journeys: journeys
        });
    }

	render() {
		return (
			<Container>
				<Title> Journeys </Title>
				{
					this.state.journeys.map(journey => {
                        return <Journey key={journey.id} journeyId={journey.id} removeJourney={this.removeJourney} journeysListSize={this.state.journeys.length}
                        setLastClickedJourney={this.setLastClickedJourney.bind(this)} lastClickedJourneyId={this.props.lastClickedJourneyId} />
					})
				}
                <NewJourneyButton onClick={this.addNewJourney}>new journey</NewJourneyButton>
			</Container>
		)
	}

	getAllJourneys = async () => {
        let res = await restApi.getAllJourneys();
		return res.data;
    }
    
    setLastClickedJourney(id) {
        this.props.setLastClickedJourney(id);
    }

    addNewJourney = async () => {
		let journeys = this.state.journeys;
        let res = await restApi.createJourney();
        journeys.push(res.data);
		this.setState({
			journeys: journeys
		});
    }
    
    removeJourney = async (id) => {
		await restApi.removeJourney(id);
        let journeys = await this.getAllJourneys();
        if (journeys.length > 0) {
            this.props.setLastClickedJourney(journeys[0].id);
        }
		this.setState({
			journeys: journeys
        });
    }
}