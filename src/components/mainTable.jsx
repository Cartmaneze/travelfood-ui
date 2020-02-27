import React, {Component} from 'react'
import styled from 'styled-components';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 220px;

	display: flex;
	flex-direction: column
`;

const Table = styled.table`
`;

export default class MainTable extends Component {
	render() {
		return (
			<Container>
				<Table />
			</Container>
		)
	}
}