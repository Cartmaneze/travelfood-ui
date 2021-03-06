import React, {Component} from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
`;

const DayButton = styled.button`
    outline: none !important;
    outline-offset: none !important;
	background-color: #4CAF50;
	padding: 40px 40px;
	border-radius: 50%;
	border: 1px solid lightgrey;
	margin: 5px 5px;
	&:hover {
		color: white;
    	background-color: darkgreen;
  	}
`;

const DayButtonClicked = styled.button`
    outline: none !important;
    outline-offset: none !important;
	background-color: darkgreen;
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

export default class Day extends Component {
	constructor() {
		super();

		this.state = {
            clicked: false
		}
    }

    componentDidMount = async () => {
        if (this.props.lastClickedDayId !== this.props.dayId) {
            this.setState({
                clicked: false
            });
        } else {
            this.setState({
                clicked: true
            });
        }
    }
    
    componentWillReceiveProps = async (nextProps) => {
        if (nextProps.lastClickedDayId !== this.props.dayId) {
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
                {this.state.clicked && this.props.daysListSize > 1 ? <RemoveButton onClick={this.removeDay.bind(this, this.props.dayId)}/> : <HidenRemoveButton /> }
                {this.state.clicked ? <DayButtonClicked /> : <DayButton onClick={this.clickDay.bind(this)} />}
			</Container>
		)
    }
    
    clickDay() {
        this.setState({
            clicked: true
        })
        this.props.setLastClickedDay(this.props.dayId);
    }

	removeDay = (id) => {
		this.props.removeDay(id);
	}
}