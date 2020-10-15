import React, {Component} from 'react'
import styled from 'styled-components';
import {DragDropContext} from 'react-beautiful-dnd';
import MealList from './mealList';
import MealRemoveArea from './mealRemoveArea';
import FoodList from './foodList';
import FealRemoveArea from './foodRemoveArea';

import foodRestApi from '../rest/food';
import mealRestApi from '../rest/meal';
import dayRestApi from '../rest/day';

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
        let meals = this.sortMeals(res.data.meals, res.data.order);
        this.setState({
            meals: meals
        });
    }

    onDragEnd = async (result) => {
        const {destination, source, draggableId} = result;
        console.log('dragEnd');
        console.log(result);
        if (source.droppableId === 'foodList' && destination.droppableId === 'mealList') {
            const dayId = this.props.lastClickedDayId;
            const foodId = draggableId;

            await mealRestApi.createMeal(dayId, foodId, 100, destination.index)
            let res = await mealRestApi.getAllMeals(dayId);
            let meals = this.sortMeals(res.data.meals, res.data.order);
            this.setState({
                meals: meals
            });
        } else if (source.droppableId === 'mealList' && destination.droppableId === 'mealList') {
            const dayId = this.props.lastClickedDayId;
            const mealId = draggableId;

            let newOrder = this.reSortMeals(source.index, destination.index);
            await dayRestApi.updateDay(dayId, newOrder.toString())
        } else if (source.droppableId === 'mealList' && destination.droppableId === 'mealRemoveArea') {
            const dayId = this.props.lastClickedDayId;
            const mealId = draggableId;

            let newOrder = this.reSortMeals(source.index, 'remove');
            await mealRestApi.removeMeal(mealId);
            await dayRestApi.updateDay(dayId, newOrder.toString())
        }
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

    sortMeals(meals, order) {
        let result = [];
        order = order || []
        order.forEach(key => {
            meals.forEach(meal => {
                if(meal.id == key) {
                    result.push(meal);
                }
            })
        })
        return result;
    }

    reSortMeals(sourInd, destInd) {
        let meals = this.state.meals;
        let meal = meals[sourInd];
        if (destInd === 'remove') {
            meals.splice(sourInd, 1);
        } else {
            meals.splice(sourInd, 1);
            meals.splice(destInd, 0, meal);
        }
        this.setState({
            meals: meals
        });
        return meals.map(item => {
            return item.id
        })
    }
}