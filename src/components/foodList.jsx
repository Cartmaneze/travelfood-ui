import React, {Component} from 'react'
import styled from 'styled-components';
import Food from './food';
import {Droppable} from 'react-beautiful-dnd';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 180px;

	display: flex;
	flex-direction: column
`;

const Table = styled.table`
`;

const TBody = styled.tbody`
`;

const TableHead = styled.thead`
`;

const Tr = styled.tr`
`;

const TaskList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'green')};
	flex-grow: 1;
	min-height: 300px;
`;

export default class FoodList extends Component {
    
	render() {
		return (
			<Container>
                <Droppable droppableId={this.props.index.toString()}>
					{(provided, shapshot) => (
						<TaskList 
						ref={provided.innerRef} 
						{...provided.droppableProps}
						isDraggingOver={shapshot.isDraggingOver}
						>
                            {
                            this.props.food.map((food, index) => <Food key={food.id} food={food} index={index} />)
                            }
							{provided.placeholder}
						</TaskList>
					)}
				</Droppable>
			</Container>
		)
	}
}