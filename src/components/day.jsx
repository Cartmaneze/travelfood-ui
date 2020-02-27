import React, {Component} from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
`;

const DayButton = styled.button`
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

const RemoveButton = styled.button`
 //   border: none !important;
	background-color: white;
	border: 1px solid lightgrey;
	color: white;
	padding: 15px;
	margin: 30px 5px;
	border-radius: 50%;
	&:hover {
    	background-color: red;
  	}
`;

export default class Day extends Component {
	constructor() {
		super();

		this.state = {
		}
	}

	render() {
		return (
			<Container>
				<RemoveButton onClick={this.removeDay.bind(this, this.props.dayId)}/>
				<DayButton />
			</Container>
		)
	}

	removeDay = (id) => {
		console.log(id);
		this.props.removeDay(id);
	}
}