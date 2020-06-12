import React, {Component} from 'react'
import styled from 'styled-components';
import {DragDropContext} from 'react-beautiful-dnd';
import MealList from './mealList';
import MealRemoveArea from './mealRemoveArea';
import FoodList from './foodList';
import FealRemoveArea from './foodRemoveArea';

import foodRestApi from '../rest/food';
import mealRestApi from '../rest/meal';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 220px;

	display: flex;
	flex-direction: column
`;

const ContainerFlex = styled.div`
	display: flex;
`;

export default class DndTables extends Component {
    state = {
        food: [],
        meals: []
    }
    
    componentDidMount = async () => {
        console.log('FoodTable componentWillReceiveProps');
        let res = await foodRestApi.getAllFood();
        
        this.setState({
            food: res.data
        });
    }

    componentWillReceiveProps = async (nextProps) => {
        console.log('dndTables componentWillReceiveProps');
        let res = await mealRestApi.getAllMeals(nextProps.lastClickedDayId);

        this.setState({
            meals: res.data
        });
    }

    onDragEnd = async (result) => {
        const {destination, source, draggableId} = result;

        if (source.droppableId !== 'foodList' || destination.droppableId !== 'mealList') return;

        const dayId = this.props.lastClickedDayId;
        const foodId = draggableId;

        await mealRestApi.createMeal(dayId, foodId)
    }
    
	render() {
		return (
            <DragDropContext 
			onDragEnd={this.onDragEnd}
			>
                <ContainerFlex>
                    <MealRemoveArea index={'mealRemoveArea'} />
                    <MealList meals={this.state.meals} index={'mealList'} />
                    <FoodList food={this.state.food} index={'foodList'} />
                    <FealRemoveArea index={'foodRemoveArea'} />
			    </ContainerFlex>
            </DragDropContext>
		)
	}
}