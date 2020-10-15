import React, {Component} from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const ContainerRight = styled.div`
    border: 1px solid lightgrey;
    position: relative;
    left:100px;
    width: 130px;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${props => 
		props.isDragging 
			? 'lightgreen' 
			: 'white'};

	display: flex;
`;

const Container = styled.div`
    border: 1px solid lightgrey;
    width: 130px;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${props => 
		props.isDragging 
			? 'lightgreen' 
			: 'white'};

	display: flex;
`;

const Handle = styled.div`
	width: 10px;
	height: 10px;
	background-color: purple;
	border-radius: 4px;
	margin-right: 8px;
`;

const Tr = styled.tr`
    width: 200px;
    height: 32px;
`;

const Td = styled.td`
    column-width: 180px;
`;

const TdSmall = styled.td`
    width: 100px;
`;


const StyledInput = styled.input`
    width: 70px;
`;

export default class Meal extends Component {

    render() {
		return (
            //this.props.meal.food.name === 'emptyFood' ?
            <Draggable 
            draggableId={this.props.meal.id.toString()} 
			index={this.props.index}
            >
                {(provided, snapshot) => (
					<Tr 
					ref={provided.innerRef} 
					{...provided.draggableProps} 
					isDragging={snapshot.isDragging}
					{...provided.dragHandleProps}
					>
                        <Td>{this.props.meal.food.name}</Td>
                        <TdSmall><StyledInput placeholder="number" type="text" /></TdSmall>
                        <TdSmall>{this.props.meal.food.calories}</TdSmall>
                    </Tr>
				)}
            </Draggable>
		)
    }
}

