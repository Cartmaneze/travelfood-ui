import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import JourneyList from './journeyList';
import DaysList from './daysList';
import DndTables from './dndTables';
import Login from './login';
import Header from './header';
import Footer from './footer';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Container = styled.div`
`;

const ContainerFlex = styled.div`
	display: flex;
`;

class App extends Component {
    state = {
        authenticated: false,
        lastClickedJourneyId: null,
        lastClickedDayId: null
    }

    authorize() {
        this.setState({
            authenticated: true
        });
    }

    isAuthenticated() {
        return cookies.get('travelfood');
    }

    setLastClickedJourney(lastClickedJourneyId) {
        this.setState({
            lastClickedJourneyId: lastClickedJourneyId
        });
    }

    setLastClickedDay(lastClickedDayId) {
        this.setState({
            lastClickedDayId: lastClickedDayId
        });
    }

    clearState() {
        this.setState({
            authenticated: false,
            lastClickedJourneyId: null,
            lastClickedDayId: null
        });
    }
    
    render() {
		return (
            this.isAuthenticated() ?
            <Container>
                <Header clearState={this.clearState.bind(this)} />
                <ContainerFlex>
                    <JourneyList setLastClickedJourney={this.setLastClickedJourney.bind(this)} lastClickedJourneyId={this.state.lastClickedJourneyId} />
				    <DaysList setLastClickedDay={this.setLastClickedDay.bind(this)} lastClickedDayId={this.state.lastClickedDayId} lastClickedJourneyId={this.state.lastClickedJourneyId} />
                    <DndTables lastClickedDayId={this.state.lastClickedDayId} />
			    </ContainerFlex>
                <Footer />
            </Container>
            :
			<ContainerFlex>
                <Login authorize={this.authorize.bind(this)} />
			</ContainerFlex>
		)	
	}
}

export default App;