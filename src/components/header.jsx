import React, {Component} from "react";
import styled from "styled-components";
import restApi from '../rest/login';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 220px;

	display: flex;
	flex-direction: column
`;

export default class Header extends Component {

    async submit() {
        await restApi.logout();
        this.clearState();
    }

    render() {
        return (
            <Container>
                <button onClick={this.submit.bind(this.props)}>Logout</button>
            </Container>
        )
    }
}