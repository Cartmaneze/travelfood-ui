import React, {Component} from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
	border: 1px solid lightgrey;
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

export default class Food extends Component {

    render() {
		return (
            <Draggable 
			draggableId={this.props.food.id.toString()} 
			index={this.props.index}
            >
                {(provided, snapshot) => (
					<Container 
					ref={provided.innerRef} 
					{...provided.draggableProps} 
					isDragging={snapshot.isDragging}
					{...provided.dragHandleProps}
					>
						<Handle  />
						{this.props.food.name}
					</Container> 
				)}
            </Draggable>
		)
    }
}

