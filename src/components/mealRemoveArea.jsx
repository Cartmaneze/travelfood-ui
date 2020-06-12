import React, {Component} from 'react'
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';

const Container = styled.div`
    border: none !important;
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 25px;
    background-color: ${props => (props.isDraggingOver ? 'red' : '#E9E9E9')};
	display: flex;
	flex-direction: column
`;

export default class MealRemoveArea extends Component {
    
	render() {
		return (
			<Droppable droppableId={this.props.index.toString()}>
					{(provided, shapshot) => (
                        <Container 
						ref={provided.innerRef} 
						{...provided.droppableProps}
						isDraggingOver={shapshot.isDraggingOver}
						/>
					)}
			</Droppable>
		)
	}
}