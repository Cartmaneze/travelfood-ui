import React, {Component} from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
`;

const JourneyButton = styled.button`
    outline: none !important;
    outline-offset: none !important;
	background-color: #8C1FA6;
	padding: 40px 40px;
	border-radius: 50%;
	border: 1px solid lightgrey;
	margin: 5px 5px;
	&:hover {
		color: white;
    	background-color: #541066;
  	}
`;

const JourneyButtonClicked = styled.button`
    outline: none !important;
    outline-offset: none !important;
	background-color: #541066;
	padding: 40px 40px;
	border-radius: 50%;
	border: 1px solid lightgrey;
	margin: 5px 5px;
`;

const RemoveButton = styled.button`
    border: none !important;
    outline: none !important;
    outline-offset: none !important;
	background-color: #E9E9E9;
	color: white;
	padding: 15px;
	margin: 30px 5px;
	border-radius: 50%;
	&:hover {
    	background-color: red;
  	}
`;

const HidenRemoveButton = styled.div`
    border: none !important;
    outline: none !important;
    outline-offset: none !important;
    background-color: white;
	padding: 15px;
	margin: 30px 5px;
    border-radius: 50%;
    &:hover {
        cursor: auto;
  	}
`;

export default class Journey extends Component {
	constructor() {
		super();

		this.state = {
            clicked: false
		}
    }

    componentWillReceiveProps = async () => {
        if (this.props.lastClickedJourneyId !== this.props.journeyId) {
            this.setState({
                clicked: false
            });
        } else {
            this.setState({
                clicked: true
            });
        }
    }

	render() {
		return (
			<Container>
                {this.state.clicked && this.props.journeysListSize > 1 ? <RemoveButton onClick={this.removeJourney.bind(this, this.props.journeyId)}/> : <HidenRemoveButton />}
				{this.state.clicked ? <JourneyButtonClicked /> : <JourneyButton onClick={this.clickJourney.bind(this)} />}
			</Container>
		)
    }
    
    clickJourney() {
        this.setState({
            clicked: true
        })
        this.props.setLastClickedJourney(this.props.journeyId);
    }

	removeJourney = (id) => {
		this.props.removeJourney(id);
	}
}