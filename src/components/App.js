import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import DaysList from './daysList';
import MainTable from './mainTable';
import restApi from './../rest/login';

const Container = styled.div`
	display: flex;
`;

class App extends Component {
	state = {

    }

	componentDidMount = async () => {
		let res = await restApi.login();
		let cookieValue = document.cookie;
		console.log(JSON.stringify(res.headers, null, 4));
		console.log(JSON.stringify(res, null, 4));
	}

	render() {
		return (
			<Container>
				<DaysList />
				<MainTable />
			</Container>
		)	
	}
}

export default App;