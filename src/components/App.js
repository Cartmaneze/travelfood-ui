import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import DaysList from './daysList';
import MainTable from './mainTable';

const Container = styled.div`
	display: flex;
`;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reverted: false
		}
	}

	render() {
		console.log('render', this.state);
		return (
			<Container>
				<DaysList />
				<MainTable />
			</Container>
		)	
	}

	revert = () => {
		console.log('revert', this.state.reverted);
		return this.setState({
		reverted: !this.state.reverted
	});
	} 
	
}

export default App;