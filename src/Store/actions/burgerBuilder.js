import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const addIngredients = (igName) => {
	return {
		type: actionTypes.INC_INGREDIENTS,
		ingredientName: igName
	}
}

export const removeIngredients = (igName) => {
	return {
		type: actionTypes.DEC_INGREDIENTS,
		ingredientName: igName
	}
}

export const setIngredients = (data) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: data
	}
}

export const fetchIngredients = () => {
	return dispatch => {
		axios.get('https://burger-labz.firebaseio.com/ingredients.json').then(response =>{
			dispatch(setIngredients(response.data))
		});
	}
}