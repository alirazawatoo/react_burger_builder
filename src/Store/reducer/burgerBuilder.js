import * as actionTypes from '../actions/actionTypes';
import { uilityContent } from '../utility';

const intialState = {
	ingredients: {},
	totalPrice: 4,
	purchaseable: false,
	ordering: false,
	loading: false
}

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.5,
	bacon: 0.2,
	meat: 2
}

const incrementIngredients = (state, action) => {
	let ingredientCount = state.ingredients[action.ingredientName]
	let ingredients = {...state.ingredients};
	ingredients[action.ingredientName] = ingredientCount + 1;
	let burgerPrice = INGREDIENTS_PRICES[action.ingredientName] + state.totalPrice;
	return uilityContent(state, { purchaseable: true, totalPrice: burgerPrice, ingredients: ingredients })
}

const decrementIngredients = (state, action) => {
	let count = state.ingredients[action.ingredientName]
	let totalIngredients = {...state.ingredients};
	totalIngredients[action.ingredientName] = count - 1;
	let price = state.totalPrice - INGREDIENTS_PRICES[action.ingredientName];

	let ingredientsSum = 0;
	for (let key in totalIngredients) {
		ingredientsSum += totalIngredients[key]
	}

	return uilityContent(state, { totalPrice: price, ingredients: totalIngredients, purchaseable: ingredientsSum > 0 })
}

const reducer = (state = intialState, action) => {
	switch(action.type) {
		case (actionTypes.SET_INGREDIENTS):
			return uilityContent(state, { ingredients: action.ingredients, totalPrice: 4, purchaseable: false })
		case (actionTypes.INC_INGREDIENTS):
			return incrementIngredients(state, action)
		case (actionTypes.DEC_INGREDIENTS):
			return decrementIngredients(state, action)
		default:
			return state
	}
}

export default reducer;