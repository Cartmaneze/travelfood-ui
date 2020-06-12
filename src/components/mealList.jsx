import React, {Component} from 'react'
import styled from 'styled-components';
import Meal from './meal';
import {Droppable} from 'react-beautiful-dnd';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 620px;

	display: flex;
	flex-direction: column
`;

const Table = styled.table`
    background-color: orange;
`;

const Body = styled.tbody`
    table-layout: auto;
    width: 100%;
    padding: 8px;
    flex-grow: 1;
	min-height: 300px;
`;

const Head = styled.thead`
`;

const HeaderRow = styled.tr`
`;

const HeaderCell = styled.th`
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

export default class MealList extends Component {
    
	render() {
		return (
			<Table>
                <Head>
                    <HeaderRow>
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Weight</HeaderCell>
                        <HeaderCell>Calories</HeaderCell>
                    </HeaderRow>
                </Head>
                <Droppable droppableId={this.props.index.toString()}>
					{(provided, shapshot) => (
                        <Body 
						ref={provided.innerRef} 
						{...provided.droppableProps}
						isDraggingOver={shapshot.isDraggingOver}
						>
                            {this.props.meals.map((meal, index) => {
                                return (
                                    <Meal key={meal.id} meal={meal} index={index} />
                                )
                            })}
							{provided.placeholder}
						</Body>
					)}
				</Droppable>
			</Table>
		)
	}
}